#!/bin/sh
set -e
cd "$(dirname "$0")"

echo "Pulling latest images..."
docker compose pull client backend

echo "Restarting services..."
docker compose up -d

echo "Deployment complete!"
