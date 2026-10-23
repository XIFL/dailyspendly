# Spending Awareness App

A React + Vite spending-awareness prototype.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Users sign in with Netlify Identity, and each account's purchases are stored in Netlify Database (see `db/schema.ts` and `netlify/functions/entries.mts`). Use `netlify dev` locally so the Identity and database services are available.
