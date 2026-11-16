# AI Prompt Sequence (this submission)

The task was built AI-natively in Cursor. Sanitised sequence of the prompts
used (in order):

1. *"@Playpower Labs Assignment_ Airbnb-Clone App.pdf — don't use Angular.
   For backend Java is better I guess."*
   → Chose **React + TypeScript (Vite)** frontend + **Java 21 / Spring Boot**
   backend; extracted the brief from the PDF (3 views: Listing, Photo Tour,
   Lightbox; desktop only; architecture diagram; no public GitHub push).
2. *"Inspect the reference page like a user — screenshots and page text only,
   then rebuild it in original code. Do not copy its source or assets."*
   → Captured layout/content behaviour at several scroll positions, the photo
   tour categories, booking-card fields and review data via the browser.
3. *"Scaffold a Spring Boot API that owns all listing data (listing, photos,
   reviews, similar stays) plus a POST /quote pricing endpoint, so the UI has
   no hard-coded content."*
4. *"Build the React listing page to match the reference: header, hero grid,
   guest-favourite banner, booking card, two-month calendar, reviews, host,
   similar stays — Airbnb tokens (#ff385c, #222, 1120px column)."*
5. *"Add the Photo Tour as a focus-trapped dialog with a category rail and
   scroll-spy, and a Lightbox on top with arrow-key navigation, counter,
   captions, focus restore and neighbour preloading."*
6. *"Make every control real: guests stepper with max-guest rules, calendar
   range → backend quote breakdown → confirm, save/share, amenities and
   reviews modals, similar-stays carousel. Add skip-link, aria states and
   reduced-motion support."*
7. *"Draw the production-scale architecture (frontend, backend, storage,
   search, deployment) as an SVG diagram and write it up in
   docs/ARCHITECTURE.md; add README, agent rules/skills, and this prompt log."*
8. *"Run both apps, screenshot our page next to the reference, and fix the
   visual differences."* (verification pass)

Tools/agents: Cursor agent with browser tooling for reference inspection and
final visual QA; project rules in `.cursor/rules/`, review skills/agents in
`.cursor/skills/` and `.cursor/agents/`.
