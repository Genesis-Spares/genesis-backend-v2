#!/bin/sh
# Apply every service's Prisma migrations, then seed roles/permissions and the default staff accounts.
# Idempotent: safe to run on every deploy.
set -e
cd "$(dirname "$0")/.."

# Local runs: take settings from the root .env (Prisma only looks for one next to each
# service's prisma.config.ts). Variables already set — e.g. by docker-compose — win.
if [ -f .env ]; then
  while IFS= read -r line || [ -n "$line" ]; do
    line=$(printf '%s' "$line" | tr -d '\r')
    case "$line" in ''|\#*) continue ;; esac
    key=${line%%=*}
    case "$key" in ''|*[!A-Za-z0-9_]*) continue ;; esac
    eval "already=\${$key+set}"
    [ "$already" = set ] && continue
    val=${line#*=}
    case "$val" in \"*\") val=${val#\"}; val=${val%\"} ;; \'*\') val=${val#\'}; val=${val%\'} ;; esac
    export "$key=$val"
  done < .env
fi

for svc in auth customer notification product order; do
  echo "→ migrating $svc-service"
  (cd "apps/$svc-service" && pnpm exec prisma migrate deploy)
done
echo "→ seeding auth (roles, permissions, default users)"
pnpm run db:seed
