---
name: ui-review
description: Screenshot-compare the clone against the reference and check accessibility before sign-off
---

# UI fidelity + accessibility review

1. Run backend (`mvn spring-boot:run`) and frontend (`npm run dev`).
2. Open the app and the reference side by side at 1440×900. Compare, top to
   bottom: header, title row, hero grid, favourite banner, booking card,
   calendar, reviews header, host, similar stays. Note spacing/typography
   deltas and fix the largest first.
3. Exercise every overlay: Photo Tour (category rail scroll-spy), Lightbox
   (`←`/`→`/Esc), amenities/reviews/description modals, guests stepper,
   Reserve → quote flow, similar-stays carousel.
4. Keyboard-only pass: Tab through the page, confirm visible focus, dialogs
   trap focus and restore it on close, skip link works.
5. Re-run `mvn -q -DskipTests package` and `npm run build`; both must pass.
