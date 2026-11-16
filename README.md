# Airbnb-Clone — Playpower Labs Take-Home

Pixel-focused clone of the reference Airbnb listing page
(*Romantic Jacuzzi 1BHK Candolim | Mirashya UG10*), with its **Listing Page**,
**Photo Tour** and **Lightbox** views. Desktop only, per the brief.

> Stack choice (per instructions): **no Angular** — frontend is
> **React + TypeScript (Vite)**, backend is **Java 21 + Spring Boot**.

## Run it

```bash
# 1) Backend (Java API) — http://localhost:8080
cd backend && mvn spring-boot:run
#    health: curl localhost:8080/api/health

# 2) Frontend — http://localhost:5173  (proxies /api → :8080)
cd frontend && npm install && npm run dev
```

Frontend-only deploy also works: if the API is unreachable the app falls back
to a bundled snapshot of the same payload (`frontend/src/data/listing.json`),
and the price quote falls back to a client port of `QuoteService.java`.

## What's implemented

- **Listing page** — sticky header + search pill, title/Share/Save, 5-photo hero
  grid, Guest-favourite banner, host highlights, description (`Show more`
  modal), *Where you'll sleep*, amenities preview + full 50-item modal,
  two-month calendar with range selection, sticky booking card (guests stepper,
  live price, Reserve → backend quote breakdown → confirm), reviews (rating
  bars, category scores, mention chips, expandable + all-reviews modal),
  location map, host & co-hosts, Things to know, similar-stays carousel, footer.
- **Sticky section bar** — appears after the hero with scroll-spy
  (Photos / Amenities / Reviews / Location) + price + Reserve.
- **Photo Tour** — full-screen overlay from *Show all photos* or any hero
  image; category rail with scroll-spy, grouped photos with amenity tags.
- **Lightbox** — from any tour photo: prev/next arrows, `←`/`→` keyboard
  navigation, `Esc`, counter + caption, neighbour preloading, slide motion.
- **Accessibility** — skip link, focus traps in every overlay, focus restore,
  `aria-modal`/labels/pressed states, visible focus rings,
  `prefers-reduced-motion` support.

## Layout

```
backend/        Java 21 · Spring Boot 3 API (ListingController, QuoteService, seed data)
frontend/       React + TS (Vite) — components/, lib/ (api + hooks), data/ fallback
architecture/   architecture.svg + architecture.png + architecture.pdf + ARCHITECTURE.md
.cursor/        rules, skills and sub-agent configs used for this build
AI-PROMPTS.md   the AI prompt sequence used to build this submission
AGENTS.md       project instructions for coding agents
```

## API

| Endpoint | Purpose |
|---|---|
| `GET /api/health` | liveness |
| `GET /api/listings/{id}` | full listing payload |
| `GET /api/listings/{id}/photos` | photo-tour groups |
| `GET /api/listings/{id}/reviews` | reviews |
| `GET /api/listings/{id}/similar` | similar stays |
| `POST /api/listings/{id}/quote` | `{checkIn, checkOut, guests}` → price breakdown |
