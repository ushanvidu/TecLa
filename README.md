# TecLa

Marketing site for TecLa (software, web, and AI engineering studio). A dark,
Apple-caliber landing page with a live Three.js hero, scroll-reveal
animations, a draggable culture photo strip, and a testimonials carousel —
implemented as a MERN app from the Claude Design handoff in `project/`.

## Stack

- **Client**: React + TypeScript + Vite (`client/`)
- **Server**: Express + TypeScript + Mongoose/MongoDB (`server/`)

## Setup

```bash
npm install          # installs client + server workspaces
cp server/.env.example server/.env   # then edit MONGODB_URI if needed
```

## Run in development

```bash
npm run dev:server   # starts the API on :4000 (needs MongoDB running)
npm run dev:client   # starts Vite on :5173, proxies /api to :4000
```

Open http://localhost:5173.

## Build for production

```bash
npm run build        # builds server (tsc) then client (vite build)
npm run --workspace server start   # serve the built API
```

Serve `client/dist` as static assets (e.g. behind the same host as the API,
or a CDN) in production.

## Notes

- Photos are hotlinked from Unsplash, matching the original design mockup.
  Swap them for real team/office/client photography before launch.
- Testimonial names/quotes and Featured Work project names are placeholders
  from the design — replace with real ones when available.
- `POST /api/contact` validates the email and stores a `ContactRequest`
  document in MongoDB.
- The original Claude Design export (HTML/CSS/JS prototype + chat transcript)
  is kept in `project/` and `chats/` for reference.
