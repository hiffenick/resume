# Nikhil Kamthe — Portfolio

A single-page portfolio built with plain HTML, CSS, and vanilla JavaScript —
no React, no build step, no framework. Animation is handled by GSAP +
ScrollTrigger, scrolling by Lenis, and the hero headline split by SplitType.

## Structure

```
portfolio/
├── index.html            Page markup, all sections
├── css/
│   └── style.css         Design tokens, layout, components, animations' base states
├── js/
│   └── script.js         Loader, Lenis, custom cursor, GSAP reveals, counters, timeline fill
├── assets/
│   ├── Nikhil_Kamthe_Resume.pdf   Résumé served by the hero "Download résumé" button
│   ├── images/           Drop project screenshots / OG cover image here
│   └── icons/
│       └── favicon.svg
└── README.md
```

## Running it locally

No build tools needed. From the `portfolio/` folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. (Opening `index.html` directly
via `file://` mostly works too, but a local server avoids occasional CORS
quirks with the GitHub stats image and font preconnects.)

## Deploying

This is a static site — it deploys as-is to:
- **Vercel / Netlify**: drag-and-drop the `portfolio/` folder, or connect the repo. No build command needed; output directory is the project root.
- **GitHub Pages**: push to a repo, enable Pages on the `main` branch, root folder.
- **Railway** (static): same pattern you've used for your other projects.

## Where the design choices came from

- **Palette** — near-black base (`#050505` / `#0d0d10`) with an electric
  blue → violet → cyan accent, used as gradients rather than flat blocks so
  it doesn't read as "neon on black" template.
- **Type** — Space Grotesk for display/headings, Inter for body copy,
  JetBrains Mono for labels, chips, and dates — the same mono face used
  across your other projects' design systems, for continuity.
- **Signature element** — the Journey timeline. It's the one place that
  gets a bespoke scroll-driven animation (the line fills in as you scroll),
  because your story genuinely is sequential — everything else stays quieter
  by comparison so that one moment lands.

## Things you'll want to swap in before publishing

1. **`assets/images/og-cover.jpg`** — add a real 1200×630 image for link
   previews (currently referenced but not created).
2. **Project screenshots** — the project cards currently show a colored
   glow instead of a screenshot. Drop real screenshots into
   `assets/images/` and swap the `.project-card__media` div for an `<img>`
   if you want visuals instead of the abstract glow treatment.
3. **GitHub stats card** — pulls live from `github-readme-stats.vercel.app`
   using your username, no setup needed, but that's a third-party public
   service — swap it out if you'd rather not depend on it.
4. Update `assets/Nikhil_Kamthe_Resume.pdf` whenever your résumé changes —
   the download button points at that exact filename.

## Performance / accessibility notes already handled

- `prefers-reduced-motion` is respected (all animations collapse to instant).
- Custom cursor is disabled below 860px (mobile/tablet) and uses the native
  cursor instead.
- GitHub stats image is lazy-loaded.
- Visible focus outlines on all interactive elements for keyboard nav.