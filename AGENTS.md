# AGENTS.md — Airbnb-clone (Playpower take-home)

## Stack (fixed)
- Frontend: React + TypeScript + Vite in `frontend/` — **never Angular**.
- Backend: Java 21 + Spring Boot 3 in `backend/` (Maven). API owns all data.
- Desktop only. Original code only — never copy the reference site's source,
  class names, or assets; match its *behaviour and look* with our own code.

## Conventions
- Airbnb tokens live in `frontend/src/index.css` (`--rausch #ff385c`,
  `--ink #222`, 1120px content column, 8px radii on controls / 12px on cards).
- All listing content comes from `GET /api/listings/{id}`; the bundled
  `frontend/src/data/listing.json` is a generated snapshot of that payload
  (regenerate with `curl localhost:8080/api/listings/mirashya-ug10`).
- Every overlay is a focus-trapped `role="dialog"` with Esc-to-close and
  focus restore (see `frontend/src/lib/hooks.ts`). Keyboard: `←`/`→` in the
  lightbox, Tab trapped in dialogs.
- Verify before finishing: `cd backend && mvn -q -DskipTests package`,
  `cd frontend && npm run build`, then run both and screenshot the page.
