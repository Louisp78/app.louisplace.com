#!/bin/bash

LOG_DIR="/tmp/app_logs"
mkdir -p $LOG_DIR

docker logs -f next_app > $LOG_DIR/client.log 2>&1 &

while true; do
  echo "=== $(date '+%Y-%m-%d %H:%M:%S') ===" >> $LOG_DIR/docker_stats.log
  docker stats --no-stream >> $LOG_DIR/docker_stats.log 2>&1
  sleep 10
done &

echo "Logging started. Check: ls -lh $LOG_DIR"
wait
