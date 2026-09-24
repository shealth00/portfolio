# Dr. I.AMU — Medical Writing Portfolio

Single-page portfolio (About / Writing samples / Visual Science /
Capabilities / Contact) for `portfolio.shealthmedia.org`. Static HTML/CSS/JS
in `public/`, served by a thin Express app whose only real job is the
contact form's backend.

## Architecture

- **Frontend**: fully static (`public/index.html`, `public/app.js`). No
  Supabase key of any kind ships to the browser.
- **Backend**: `POST /api/contact` is the only server route with logic. It
  validates the submission and inserts it into a `contact_submissions`
  table in a dedicated Supabase project ("portfolio"), using
  `SUPABASE_SERVICE_KEY` — which lives only in this process's environment.
- **Storage**: a public `assets` bucket exists on the same Supabase project
  for future downloadable files (CV/resume PDF, full writing samples) —
  nothing uploaded there yet.

## Run locally

```
npm install
cp .env.example .env   # fill in SUPABASE_URL / SUPABASE_SERVICE_KEY
npm start
```

Visit `http://localhost:3000`. Without the two env vars set, the site
still runs — the contact form just returns a clear 503 instead of
pretending to succeed.

## Deploy on Hostinger

1. Push this repo to GitHub (already done: `shealth00/portfolio`).
2. In hPanel, create a Node.js app (same section as the `courses` app) and
   point it at this repo.
3. Set two environment variables on the Node app: `SUPABASE_URL` and
   `SUPABASE_SERVICE_KEY` (Project Settings → API → service_role secret,
   on the "portfolio" Supabase project — a different project from
   `courses`'s).
4. Point `portfolio.shealthmedia.org` at this app in Hostinger's domain
   settings.
5. `@supabase/storage-js` is pinned to `2.78.0` as a direct dependency for
   the same reason as in `courses`: newer resolved versions need Node
   ≥20/22, and this account's Node app runtime is 18.x.

## Viewing contact submissions

There's no admin UI yet — read them from the Supabase dashboard's Table
Editor on the "portfolio" project, `contact_submissions` table.

## Editing content

Everything (bio, credentials, the 6 writing samples, services, contact
copy) lives directly in `public/index.html`. Category tags for the
filter pills are the `data-cat` attribute on each `.card` in the
Writing section.
