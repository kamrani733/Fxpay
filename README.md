# Transactions

Two independent financial transaction apps in one pnpm workspace:

- Next.js app: `apps/next-transactions`
- Nuxt app: `apps/nuxt-transactions`
- Shared logic: `packages/shared`

Both apps read mock transactions directly from `packages/shared`. No API server is required.

## Demo

Nuxt:

```text
https://nuxt-transactions.vercel.app?_vercel_share=Irx8pUF4oqdH5jMUNISvtLqbCadldbfx
```

Next:

```text
https://vercel.com/kamrani733s-projects/next-transactions/EaJHqBRiASWHViFCE3t2V5oibSzK
```

## Install

```bash
pnpm install
```

## Run Next.js

From the repo root:

```bash
pnpm dev:next
```

Or from the Next app folder:

```bash
cd apps/next-transactions
npm run dev
```

Open:

```text
http://localhost:3000
```

## Run Nuxt

From the repo root:

```bash
pnpm dev:nuxt
```

Or from the Nuxt app folder:

```bash
cd apps/nuxt-transactions
npm run dev
```

Open:

```text
http://localhost:3001
```

## Build

```bash
pnpm --filter next-transactions build
pnpm --filter nuxt-transactions build
```

## Tests

Shared logic tests:

```bash
pnpm test:shared
```
