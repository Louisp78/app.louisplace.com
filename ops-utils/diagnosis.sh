

 #!/usr/bin/env bash
# ─── VPS Network Diagnostic ───────────────────────────────────────────────────
# Usage: bash net_diag.sh 2>&1 | tee /tmp/net_diag.log

set -euo pipefail
RED='\033[0;31m'; GRN='\033[0;32m'; YLW='\033[1;33m'; BLU='\033[0;34m'; NC='\033[0m'
ok()   { echo -e "  ${GRN}✔${NC}  $*"; }
fail() { echo -e "  ${RED}✘${NC}  $*"; }
warn() { echo -e "  ${YLW}!${NC}  $*"; }
sep()  { echo -e "\n${BLU}══ $* ══${NC}"; }

# ── 1. BASIC INFO ─────────────────────────────────────────────────────────────
sep "1. System / IP info"
echo "  hostname : $(hostname)"
echo "  kernel   : $(uname -r)"
echo "  public IP: $(curl -s --max-time 5 https://ifconfig.me || echo 'unreachable')"
ip addr show | awk '/inet /{print "  iface    : "$NF, $2}'
ip route show | head -5 | sed 's/^/  route    : /'

# ── 2. ICMP PING ──────────────────────────────────────────────────────────────
sep "2. ICMP ping"
for host in 8.8.8.8 1.1.1.1 google.com github.com claude.ai; do
  if ping -c 2 -W 3 "$host" &>/dev/null; then
    rtt=$(ping -c 2 -W 3 "$host" | tail -1 | awk -F'/' '{print $5}' 2>/dev/null || echo '?')
    ok "$host  (avg ${rtt}ms)"
  else
    fail "$host  (no reply)"
  fi
done

# ── 3. DNS RESOLUTION ─────────────────────────────────────────────────────────
sep "3. DNS resolution"
echo "  /etc/resolv.conf nameservers:"
grep nameserver /etc/resolv.conf | sed 's/^/    /'
for host in github.com gitlab.com claude.ai api.github.com objects.githubusercontent.com; do
  ip=$(dig +short +time=3 "$host" A 2>/dev/null | head -1)
  [ -n "$ip" ] && ok "$host → $ip" || fail "$host → no answer"
done
echo
warn "Trying alternate resolver (8.8.8.8):"
for host in github.com claude.ai; do
  ip=$(dig +short +time=3 "@8.8.8.8" "$host" A 2>/dev/null | head -1)
  [ -n "$ip" ] && ok "8.8.8.8 → $host → $ip" || fail "8.8.8.8 → $host → no answer"
done

# ── 4. TCP CONNECTIVITY ───────────────────────────────────────────────────────
sep "4. TCP port reachability (nc)"
tcp_test() {
  local host=$1 port=$2 label=${3:-}
  if nc -zw 5 "$host" "$port" 2>/dev/null; then
    ok "TCP $host:$port  ${label}"
  else
    fail "TCP $host:$port  ${label}"
  fi
}
tcp_test 8.8.8.8         53  "(Google DNS)"
tcp_test 1.1.1.1         53  "(Cloudflare DNS)"
tcp_test github.com      22  "(SSH / git)"
tcp_test github.com      443 "(HTTPS)"
tcp_test objects.githubusercontent.com 443 "(git objects CDN)"
tcp_test ssh.github.com  443 "(git over HTTPS fallback)"
tcp_test claude.ai       443 "(claude.ai)"
tcp_test api.anthropic.com 443 "(Anthropic API)"

# ── 5. TLS HANDSHAKE ──────────────────────────────────────────────────────────
sep "5. TLS handshake (openssl)"
tls_test() {
  local host=$1
  result=$(echo | timeout 8 openssl s_client -connect "${host}:443" \
    -servername "$host" 2>&1 | grep -E "Verify return|subject|SSL-Session" | head -3)
  if echo "$result" | grep -q "Verify return code: 0"; then
    ok "$host  TLS OK"
  else
    fail "$host  TLS failed"
    echo "$result" | sed 's/^/      /'
  fi
}
tls_test github.com
tls_test objects.githubusercontent.com
tls_test claude.ai
tls_test api.anthropic.com

# ── 6. HTTP(S) RESPONSE ───────────────────────────────────────────────────────
sep "6. HTTP/HTTPS response (curl)"
http_test() {
  local url=$1
  code=$(curl -s -o /dev/null -w "%{http_code}" \
    --max-time 10 --connect-timeout 5 "$url" 2>/dev/null || echo "000")
  time=$(curl -s -o /dev/null -w "%{time_total}" \
    --max-time 10 --connect-timeout 5 "$url" 2>/dev/null || echo "?")
  if [[ "$code" =~ ^[23] ]]; then
    ok "$url  → HTTP $code  (${time}s)"
  else
    fail "$url  → HTTP $code  (${time}s)"
  fi
}
http_test "https://github.com"
http_test "https://api.github.com"
http_test "https://claude.ai"
http_test "https://api.anthropic.com/v1/messages"
http_test "https://google.com"
http_test "https://1.1.1.1"  # direct IP, bypasses DNS

# ── 7. MTU / FRAGMENTATION ───────────────────────────────────────────────────
sep "7. MTU / IP fragmentation"
iface=$(ip route | grep default | awk '{print $5}' | head -1)
mtu=$(cat /sys/class/net/${iface}/mtu 2>/dev/null || echo '?')
echo "  default interface : $iface  (MTU $mtu)"
for size in 1400 1450 1472 1480 1492; do
  if ping -c 1 -M do -s $size -W 2 8.8.8.8 &>/dev/null; then
    ok "Ping size $((size+28))B (payload ${size}B) — no fragmentation"
  else
    warn "Ping size $((size+28))B blocked or fragmented"
  fi
done

# ── 8. ROUTING / TRACEROUTE ───────────────────────────────────────────────────
sep "8. Traceroute to github.com (max 20 hops)"
if command -v traceroute &>/dev/null; then
  traceroute -m 20 -w 2 github.com 2>&1 | head -25 | sed 's/^/  /'
elif command -v tracepath &>/dev/null; then
  tracepath -n github.com 2>&1 | head -25 | sed 's/^/  /'
else
  warn "Neither traceroute nor tracepath found"
fi

# ── 9. FIREWALL / IPTABLES ───────────────────────────────────────────────────
sep "9. Local firewall rules"
if command -v iptables &>/dev/null; then
  echo "  iptables OUTPUT chain:"
  iptables -L OUTPUT -n --line-numbers 2>/dev/null | sed 's/^/    /' || warn "Need root for iptables"
fi
if command -v nft &>/dev/null; then
  echo "  nftables ruleset (output):"
  nft list ruleset 2>/dev/null | grep -A5 'output' | head -20 | sed 's/^/    /' || true
fi

# ── 10. SYSTEM PROXY / ENV ───────────────────────────────────────────────────
sep "10. Proxy / env variables"
for var in http_proxy https_proxy HTTP_PROXY HTTPS_PROXY no_proxy NO_PROXY; do
  val="${!var:-}"
  [ -n "$val" ] && warn "$var=$val" || echo "  $var=(unset)"
done
grep -i proxy /etc/environment 2>/dev/null | sed 's/^/  /g' || true
grep -i proxy /etc/profile.d/*.sh 2>/dev/null | sed 's/^/  /' || true

# ── SUMMARY ──────────────────────────────────────────────────────────────────
sep "Done"
echo "  Log saved to /tmp/net_diag.log (if you used tee)"
echo "  Share the output to continue debugging."
