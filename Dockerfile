# One image holds every service; docker-compose picks the entrypoint per container.
FROM node:22-slim AS base
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Full toolchain + sources: builds the services, and runs migrations/seeding (see scripts/migrate.sh).
FROM deps AS build
COPY . .
RUN for app in api-gateway auth-service customer-service notification-service product-service order-service; do \
      pnpm exec nest build "$app" || exit 1; \
    done

FROM base AS runtime
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod && pnpm store prune
COPY --from=build /app/dist ./dist
USER node
CMD ["node", "dist/apps/api-gateway/main.js"]
