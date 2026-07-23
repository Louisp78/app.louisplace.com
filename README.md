# app.louisplace.com

[![CI](https://github.com/Louisp78/louisplace.com/actions/workflows/build_and_deploy.yml/badge.svg)](https://github.com/Louisp78/louisplace.com/actions/workflows/build_and_deploy.yml)

A static blog about underwater robotics projects — a Next.js frontend with articles stored directly in the codebase, no backend or database.

## Quick overview

- Frontend: `client` (Next.js) — the entire site, built as a fully static export (`output: 'export'`)
- Articles: JSON files under `client/src/features/post/data`
- Deployment: GitHub Actions builds the static site, uploads the exported `out/` folder to the VPS over SSH, and serves it with a tiny `nginx:alpine` container on port 80 (HTTPS is terminated by Cloudflare). No repo, Node runtime, or database lives on the VPS.

## Prerequisites

- Node + pnpm (for local development)

## Prepare environment files

This repo includes an example env file. Copy it to enable sensible defaults for local runs:

```bash
cp ./client/.env.example ./client/.env
```

## Run locally (dev/debug)

To start the frontend for local development:

```bash
cd client
pnpm install
pnpm dev
```

## Build the static site

```bash
cd client
pnpm build   # outputs a fully static site to client/out
```

## Writing a new article

Add a new JSON file under `client/src/features/post/data` following the shape defined in `client/src/features/post/post.d.ts`, then it will show up on the homepage automatically.

## Notes & tips

- If you want site-wide defaults for styling, check `client/src/app/globals.css`.

## CI / Deployment

The pipeline lives in `.github/workflows/build_and_deploy.yml`:

- **Every pull request to `main`** runs lint, type-check, test and build — no deploy.
- **Every push to `main`** runs the same checks and, only if they all pass, deploys: the exported `out/` is uploaded to the VPS and served by an `nginx:alpine` container on port 80 (HTTPS via Cloudflare).

Required repository secrets: `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `SSH_PORT`. Optional repository variables `PUBLIC_BASE_URL` / `PUBLIC_URL` set the site's canonical URL for metadata (falls back to `http://localhost:3000`).

## Troubleshooting

- If port 3000 is in use locally, stop the occupying service or run `pnpm dev -- -p <port>`.
- Install recommended vscode extensions.
