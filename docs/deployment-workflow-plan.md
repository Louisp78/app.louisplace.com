# Deployment Workflow Redesign Plan

## Problem Statement
Current workflow builds Docker images on the VPS via SSH, which is resource-intensive and complex.

## Current Architecture
```
GitHub PR → CI (SSH to VPS) → VPS: git pull + docker build + docker compose up
```

**Files involved:**
- `.github/workflows/build_and_deploy.yml` - Current CI workflow
- `docker-compose.yml` - Orchestration
- `deploy.sh` - Deployment script
- Dockerfiles: `client/dockerfile`, `backend/dockerfile`

## Proposed Architecture
```
GitHub PR with [BUILD] tag → CI: Build images → Push to Docker Hub → SSH to VPS: docker compose pull + up
```

## Design Decisions

### Container Registry: Docker Hub
- GitHub is blocked from VPS, so ghcr.io won't work
- Docker Hub uses different domains (`registry-1.docker.io`) that are accessible
- Free tier: 1 private repo, unlimited public repos
- Requires: `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets in GitHub

### Images Built in CI
- `client` (Next.js) - **Build in CI, push to Docker Hub**
- `backend` (Spring Boot) - **Build in CI, push to Docker Hub**
- `db` (PostgreSQL) - Uses base image, no CI build needed
- `apache` (Reverse proxy) - **Keep building on VPS** (SSL certs stay local, rarely changes)

### Deployment Trigger
- Keep `[BUILD]` tag requirement in PR title
- Manual workflow dispatch also available

## Implementation Plan

### Step 1: Setup Docker Hub Secrets in GitHub
Add these secrets to your GitHub repository:
- `DOCKERHUB_USERNAME` - Your Docker Hub username
- `DOCKERHUB_TOKEN` - Access token from Docker Hub (Settings → Security → New Access Token)

### Step 2: Rewrite CI Workflow
**File:** `.github/workflows/build_and_deploy.yml`

```yaml
name: Build and Deploy

on:
  pull_request:
    types: [closed]
  workflow_dispatch:

jobs:
  build:
    if: >
      github.event_name == 'workflow_dispatch' ||
      (github.event.pull_request.merged == true &&
       contains(github.event.pull_request.title, '[BUILD]'))
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push client
        uses: docker/build-push-action@v5
        with:
          context: ./client
          file: ./client/dockerfile
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/louisplace-client:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Build and push backend
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          file: ./backend/dockerfile
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/louisplace-backend:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          port: ${{ secrets.SSH_PORT }}
          script: ~/louisplace.com/deploy.sh
```

### Step 3: Update docker-compose.yml
**File:** `docker-compose.yml`

Change client and backend from `build:` to `image:`:
```yaml
services:
  client:
    image: ${DOCKERHUB_USERNAME}/louisplace-client:latest  # Changed from build: ./client
    container_name: next_app
    # ... rest stays the same

  backend:
    image: ${DOCKERHUB_USERNAME}/louisplace-backend:latest  # Changed from build: ./backend
    container_name: spring_boot_app
    # ... rest stays the same
```

Keep `build:` for apache and db (they stay local).

### Step 4: Add DOCKERHUB_USERNAME to VPS environment
Create `.env` file on VPS with:
```
DOCKERHUB_USERNAME=yourusername
```

### Step 5: Update deploy.sh
**File:** `deploy.sh`

```bash
#!/bin/sh
set -e
cd "$(dirname "$0")"

echo "Pulling latest images..."
docker compose pull client backend

echo "Restarting services..."
docker compose up -d

echo "Deployment complete!"
```

This script is called by CI via SSH and handles the VPS-side deployment.

## Files to Modify
| File | Change |
|------|--------|
| `.github/workflows/build_and_deploy.yml` | Complete rewrite - build in CI, push to Docker Hub |
| `docker-compose.yml` | client/backend: `build:` → `image:` |
| `deploy.sh` | Simplify to pull + up |

## VPS Cleanup (After Verification)
Once working, you can remove from VPS:
- Git repository clone (no longer needed)
- Source code directories
- Keep only: `docker-compose.yml`, `.env*` files, `apache/` dir, SSL certs

## Verification Plan
1. Add Docker Hub secrets to GitHub repo
2. Trigger workflow manually or with [BUILD] PR
3. Verify images appear on Docker Hub
4. SSH to VPS and run `docker compose pull` manually to test
5. Full end-to-end deployment test
