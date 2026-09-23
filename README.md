# The Differential — Medical Writing Portfolio

Dr. Ishmael Amu's medical, pharma, and public-health writing portfolio.
Two tabs: **Medical Writer** (bio, services, contact) and **Writing
Samples** (10 case pieces across pharma, clinical/HCP, oncology,
diagnostics, devices, and global health, filterable by category).

No database, no API keys, no environment variables — every page is
static content in `public/`. `server.js` is a thin Express static-file
server, kept only because it's a known-working pattern on this
Hostinger account (see the `courses` app).

## Run locally

```
npm install
npm start
```

Visit `http://localhost:3000`.

## Deploy on Hostinger

1. Push this repo to GitHub.
2. In hPanel, create a new **Node.js app** (same app type as the `courses`
   project) and point it at this repo — no environment variables need to
   be set.
3. Point `portfolio.shealthmedia.org` at this app in Hostinger's domain
   settings, the same way `courses.shealthmedia.org` / `shealthmedia.org`
   is wired to the `courses` app.
4. Hostinger's Node runtime here is 18.x — this app has no dependency
   beyond `express`, so there's no version pitfall to watch for (unlike
   `courses`, which pins `@supabase/storage-js` for exactly this reason).

## Editing content

Both tabs' content lives directly in `public/index.html` — bio copy in
the `#panel-writer` section, case samples in the `#panel-samples`
section. Styling is in `public/styles.css` (design tokens at the top:
`--paper`, `--ink`, `--accent`, etc.). Tab-switching and the sample
filter chips are in `public/app.js`.

To personalize the contact card, replace the placeholder spans (`[contact
email]`, `[LinkedIn / Fiverr profile link]`) in `public/index.html`.
