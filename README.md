# NOVAÉ — Modern Food & Drinks Website

A premium, single-page marketing site for **NOVAÉ**, a fictional D2C food &
beverage brand. Built as a static portfolio piece: plain HTML, CSS and
JavaScript, no build step, no dependencies, deployable straight to GitHub
Pages.

## Files

```
index.html   → structure and content
style.css    → design system + all styling
script.js    → interactivity + editable content (SITE_DATA)
README.md    → this file
```

## Run it locally

No build step required. Either:

- Open `index.html` directly in a browser, or
- Serve the folder locally (recommended, avoids any browser file:// quirks):
  ```
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push these four files to a repository.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch".
4. Choose the branch (e.g. `main`) and root folder `/`.
5. Save — your site will be live at `https://<username>.github.io/<repo>/`.

## What's included

- Sticky, blurred navbar with mobile menu, search overlay and cart drawer
- Cinematic hero with entrance animation and scroll cue
- Product collection grid (view / add to cart, both functional)
- Food vs. Drinks split section
- Editorial brand story section
- Ingredients / quality principles section
- Full-width product showcase
- Lifestyle image gallery
- Auto-advancing testimonial slider
- Journal (editorial articles) grid
- Newsletter form with in-page success state
- Final call-to-action + footer
- A signature **tasting rail**: a fixed scroll-progress indicator on the
  right edge of the screen that shifts colour as you move through the
  page, echoing the idea of a guided tasting

Every interactive element (search, cart, quantity steppers, newsletter,
mobile nav, testimonial slider, smooth-scroll links) is wired up with
vanilla JavaScript — nothing is decorative.

## Customizing for a real client

Almost everything editable lives in one place: the `SITE_DATA` object at
the top of `script.js`.

```js
const SITE_DATA = {
  brand: { name, whatsapp, instagram, email },
  products: [ { id, name, category, price, image, tag, desc }, ... ],
  testimonials: [ { quote, author }, ... ],
  journal: [ { title, desc, image }, ... ]
};
```

To rebrand:

1. **Brand name** — replace `NOVAÉ` in `index.html` (logo, footer, `<title>`)
   and update `SITE_DATA.brand.name` if you extend the JS to use it.
2. **Products / prices** — edit the `products` array in `script.js`. The
   grid, search results and cart all read from this array automatically.
3. **Images** — every image is a plain `<img src="...">` (or set in
   `SITE_DATA`). Swap the URLs for real product photography — same
   dimensions/aspect ratios will drop in cleanly (see aspect-ratio rules
   in `style.css` if you change crops).
4. **Copy** — headline, supporting text and section copy are plain text in
   `index.html`, organized section-by-section with clear HTML comments.
5. **Contact / social** — update the footer links in `index.html`
   (`mailto:`, `tel:`, Instagram, WhatsApp).
6. **Colours / type** — all design tokens (colours, fonts, spacing units)
   are CSS custom properties at the top of `style.css` under `:root`.
   Changing them updates the whole site consistently.

## Notes

- Images are pulled from Unsplash for demo purposes. Replace with owned or
  licensed photography before using this for a live client site.
- The cart, checkout and newsletter are front-end only (no backend) — by
  design, per the brief. Checkout shows a friendly demo message instead of
  processing a real order.
- Respects `prefers-reduced-motion` and keeps visible focus states for
  keyboard navigation.
- Tested down to 375px wide with no horizontal scroll or overlap.
