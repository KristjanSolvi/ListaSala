# Listavefsala

Swipe-first marketplace concept for emerging Icelandic artists. Visitors browse art Tinder-style, save favourites to a Pinterest-like collection, and complete lightweight checkout directly with artists.

## Run locally

```bash
npm install
npm run dev
```

> `npm run dev/build/start` invoke the vendored Node 20 binary provided by the `node@20.16.0` package so the app runs even if your global Node is v22+. No extra setup required after `npm install`.

## Features

- Swipe deck with keyboard and touch controls for discovering new works.
- Saved collection mood board with quick access to checkout.
- Checkout flow with buyer details, shipping choice, and order confirmation.
- Local-first auth: swipe anonymously, sign in later to sync saved pieces.
- Local storage persistence for saved pieces and orders (no backend yet).

## Tech

- Next.js App Router (React 18)
- TypeScript
- Local storage powered context providers

This website was made to test the new Codex model.
