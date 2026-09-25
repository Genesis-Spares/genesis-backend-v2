#!/bin/sh
# Apply every service's Prisma migrations, then seed roles/permissions and the default staff accounts.
# Idempotent: safe to run on every deploy.
set -e
cd "$(dirname "$0")/.."
for svc in auth customer notification product order; do
  echo "→ migrating $svc-service"
  (cd "apps/$svc-service" && pnpm exec prisma migrate deploy)
done
echo "→ seeding auth (roles, permissions, default users)"
pnpm run db:seed
