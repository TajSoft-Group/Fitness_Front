#!/usr/bin/env bash
# Manual deploy, run on the server from the repo checkout (see deploy/README.md).
# The new image is built next to the running one: a failed build leaves the site as it is.
set -euo pipefail
cd "$(dirname "$0")/.."

# master is this client's (mubingym) branch.
git fetch origin
git reset --hard origin/master

if [[ ! -f .env ]]; then
    echo ".env is missing in $(pwd): create it from .env.example (deploy/README.md)" >&2
    exit 1
fi
env_value() { grep -E "^$1=" .env | tail -1 | cut -d= -f2- | tr -d "\"'"; }
if [[ -z "$(env_value PORT)" || "$(env_value VITE_API_URL)" != https://* ]]; then
    echo "Refusing to deploy: .env needs PORT and an https:// VITE_API_URL." >&2
    exit 1
fi

# --pull: base images are fetched again, so every deploy picks up their security releases.
docker compose build --pull
docker compose up -d --wait --remove-orphans

# The previous build lost its name to the new one: remove only this project's untagged images.
docker image prune -f --filter "label=project=mubingym-admin"

echo "Deployed $(git rev-parse --short HEAD)"
