# app.louisplace.com

[![Build and Deploy Pipeline](https://github.com/Louisp78/louisplace.com/actions/workflows/build_and_deploy.yml/badge.svg)](https://github.com/Louisp78/louisplace.com/actions/workflows/build_and_deploy.yml)

Lightweight personal stack for louisplace.com — Next.js frontend + Spring Boot backend, packaged with Docker Compose.

## Quick overview

- Frontend: `client` (Next.js)
- Backend: `backend` (Spring Boot)
- Orchestration: `docker-compose.yml` at repository root

## Prerequisites

- Docker & Docker Compose
- Ports 3000 and 8080 must be free on your machine (or update compose config)

## Prepare environment files

This repo includes example env files. Copy them to enable sensible defaults for local runs:

```bash
cp ./client/.env.example ./client/.env
cp ./backend/.env.example ./backend/.env
cp .env.db.example .env.db
cp .env.oauth.example .env.oauth
```

Edit those copies to override any values you need (database credentials, OAuth secrets, etc.).

## Run (recommended)

Runs `docker compose up -d --build` and brings the frontend + backend up in detached mode.

## Run locally (dev/debug)

- To start just the frontend for local development, use the `client` package scripts (requires Node):

```bash
cd client
pnpm install    # or npm/yarn
pnpm dev
```

- To run both services with Docker Compose (fast way to replicate production locally):

```bash
docker compose up --build
```

## Notes & tips

- Use `./deploy.sh` for simple deploys; it expects you to be on a machine with Docker installed and authenticated if you pull private images.
- If you want site-wide defaults for styling, check `client/src/app/globals.css`.

## Troubleshooting

- If ports are in use, either stop the occupying service or change ports in `docker-compose.yml`.
- Install recommended vscode extensions.

---

If you'd like, I can also add a one-command script to bootstrap the env files and run the stack (example: `scripts/start-local.sh`).
