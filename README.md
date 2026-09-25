# Genesis backend

NestJS microservices behind one HTTP gateway:

| Service | Transport | Port | Database |
|---|---|---|---|
| `api-gateway` | HTTP (`/api`) | 11000 | — |
| `auth-service` | TCP | 11001 | `genesis_auth` |
| `notification-service` | Redis events (+ HTTP 11003) | 11003 | `genesis_notification` |
| `product-service` | TCP | 11004 | `genesis_catalog` |
| `customer-service` | TCP | 11005 | `genesis_customer` |
| `order-service` | TCP | 11006 | `genesis_order` |

Each service owns its own Postgres database and Prisma schema (`apps/<service>/prisma`). Redis carries events between services and caches products.

## Run with Docker

```bash
cp .env.example .env          # set JWT_SECRET, SMTP, M-Pesa, SEED_* passwords
docker compose up --build     # API: http://localhost:11000/api
```

A one-shot `migrate` container applies every service's migrations and seeds roles, permissions and the default admin/staff accounts before the services start. It's idempotent, so it runs on every `up`.

With [`genesis-frontend-shop`](https://github.com/Genesis-Spares/genesis-frontend-shop) and [`genesis-dashboard`](https://github.com/Genesis-Spares/genesis-dashboard) cloned next to this repo, `docker compose --profile frontends up --build` also serves the storefront on :3000 and the dashboard on :3001.

## Run locally (without Docker)

Needs Node 22, pnpm 10, Postgres 16 and Redis.

```bash
pnpm install
cp .env.example .env          # defaults point at localhost
for db in genesis_auth genesis_customer genesis_notification genesis_catalog genesis_order; do createdb "$db"; done
pnpm db:migrate               # migrations for every service + seed
pnpm build:all
node dist/apps/<service>/main.js   # one per service, or `pnpm start:dev <service>`
```

Default logins (unless `SEED_*` is set): `admin@genesis.com` / `Admin123!@#`, `staff@genesis.com` / `Staff123!@#`. **Set `SEED_ADMIN_PASSWORD` and `SEED_STAFF_PASSWORD` before seeding any shared database.**

After changing a `schema.prisma`: `cd apps/<service> && pnpm exec prisma migrate dev --name <change>` (also regenerates the committed client in `src/generated/prisma`).

## Checkout, payments, delivery and VAT

- **M-Pesa (STK push).** Checkout creates the order as `PENDING` and sends the M-Pesa prompt to the shopper's phone. Safaricom calls `POST /api/payments/mpesa/callback/<MPESA_CALLBACK_SECRET>`, which marks the order paid and confirmed. The storefront polls `GET /api/me/orders/:id/payment` and can re-send the prompt with `POST /api/me/orders/:id/pay`. If a callback never arrives, the order service asks Daraja for the status. Orders still unpaid after `MPESA_PAYMENT_TIMEOUT_MINUTES` are cancelled and their stock released.
  - Get sandbox keys at [developer.safaricom.co.ke](https://developer.safaricom.co.ke). The callback URL must be public HTTPS (use a tunnel such as ngrok locally).
  - Without credentials, local (non-production) runs use **mock mode**: payments succeed after `MPESA_MOCK_DELAY_MS`, and phones ending in `0000` decline. With `NODE_ENV=production` (including Docker), M-Pesa checkout is refused until it's configured.
  - Card payments are disabled until a card processor is integrated. Pay on delivery stays available in zones that allow it.
- **Delivery zones.** A shopper's town picks the zone; towns no zone lists use the default zone. Each zone has a base fee, an optional per-kg surcharge above an included weight (from product weights), a free-delivery threshold, ETA and whether cash on delivery is allowed. Manage zones in the dashboard (**Settings → Delivery & VAT**) or via `/api/settings/delivery-zones`.
- **VAT.** Default 16%, added on top of prices (and on delivery unless turned off), rounded to whole shillings. The rate is stored on each order. Configure it at `/api/settings/checkout`.
- **Emails to customers.** Dashboard → Emails composes rich-text emails (drafts autosave). Each recipient gets their own copy, with `{{firstName}}`, `{{lastName}}`, `{{fullName}}` and `{{email}}` filled in. The HTML is sanitised server-side, replies go to `SUPPORT_INBOX_EMAIL`, and "marketing" emails skip customers who opted out. Delivery status is recorded per recipient and shown on the customer's profile. Needs SMTP configured.
- Public helpers for the cart page: `GET /api/checkout/delivery-zones` and `POST /api/checkout/quote` (`{ city, items: [{ productId, quantity }] }`).
