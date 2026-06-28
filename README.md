# Chicago 2026 — Family Trip Guide

A simple, elegant, mobile-friendly website for our Chicago family visit (July 12–17, 2026).
Built with Next.js. Live weather comes from the free Open-Meteo API (no API key needed).

## What's inside
- **Day-by-day itinerary** — every plan as a tappable card
- **Event detail pages** — each item has its own page with description, address, tips, and links to tickets/website/maps
- **Live weather** — current Chicago conditions plus the forecast for the trip dates (the daily forecast fills in automatically about two weeks out)
- **More Ideas** — first-timer suggestions chosen for easy walking and lots of seating
- **Dinner & Dining** — affordable spots that can seat 6–7 on shorter notice

## Editing the content
All the text lives in one file: **app/lib/data.js**.
Change a venue name, address, time, link, or tip there and the site updates everywhere.

---

## Deploy to Vercel (via GitHub)

1. **Create a GitHub repo** at https://github.com/new (e.g. `chicago-trip`), click **Create repository**.
2. **Upload the files** — on the repo page click *"uploading an existing file"* and drag in everything here EXCEPT the `node_modules` and `.next` folders. Commit.
   - Or with git: `git init && git add . && git commit -m "first commit" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`
3. **Connect to Vercel** — sign in at https://vercel.com with GitHub, click **Add New → Project**, import the repo, click **Deploy**. Vercel auto-detects Next.js; no settings needed.
4. **Done** — you'll get a live link like `chicago-trip.vercel.app`. Every future push redeploys automatically.

Rename the URL or add a custom domain under **Settings → Domains** in Vercel.

## Run locally (optional)
```bash
npm install
npm run dev
```
Open http://localhost:3000
