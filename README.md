# app.louisplace.com

[![Build and Deploy Pipeline](https://github.com/Louisp78/louisplace.com/actions/workflows/build_and_deploy.yml/badge.svg)](https://github.com/Louisp78/louisplace.com/actions/workflows/build_and_deploy.yml)

A static blog about underwater robotics projects — a Next.js frontend with articles stored directly in the codebase, no backend or database.

## Quick overview

- Frontend: `client` (Next.js) — the entire site
- Articles: JSON files under `client/src/features/post/data`
- Orchestration: `docker-compose.yml` at repository root (runs `client`, exposed on port 80; HTTPS is terminated by Cloudflare)

## Prerequisites

- Docker & Docker Compose
- Port 3000 must be free on your machine (or update compose config)

## Prepare environment files

This repo includes an example env file. Copy it to enable sensible defaults for local runs:

```bash
cp ./client/.env.example ./client/.env
```

## Run (recommended)

```bash
docker compose up -d --build
```

## Run locally (dev/debug)

To start the frontend for local development (requires Node):

```bash
cd client
pnpm install
pnpm dev
```

## Writing a new article

Add a new JSON file under `client/src/features/post/data` following the shape defined in `client/src/features/post/post.d.ts`, then it will show up on the homepage automatically.

## Notes & tips

- If you want site-wide defaults for styling, check `client/src/app/globals.css`.

## Troubleshooting

- If port 3000 is in use, either stop the occupying service or change the port in `docker-compose.yml`.
- Install recommended vscode extensions.
