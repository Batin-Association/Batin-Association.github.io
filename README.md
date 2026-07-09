# Batin foundation website

The public website for **Batin**, a Norwegian non-profit association building free
privacy software. This repository is deployed with GitHub Pages.

- English (default): `index.html`
- Norwegian: `no/index.html`
- Governance documents: `dokumenter/`
- Shared assets (self-hosted CSS, fonts, logo, Paged.js): `assets/`

Everything is self-contained. No external requests, no trackers, no analytics, in keeping
with the association's promises.

## Local preview

Governance documents use Paged.js, which needs to be served over HTTP (not opened as a
file). From this folder:

    python -m http.server 8765

then open <http://localhost:8765/>.
