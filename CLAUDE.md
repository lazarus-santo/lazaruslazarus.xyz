# CLAUDE.md — Lazarus Bar & Gallery

## Project Overview
Build a minimal, typographically-driven one-page website for **Lazarus** — a bar that doubles as a gallery in New York City. The site should feel warm but confident, anti-establishment but refined. It speaks to artists who are tired of being taken advantage of and collectors who are tired of being ignored.

---

## Tech Stack
- **Framework**: Vanilla HTML + CSS + minimal JavaScript (no frameworks)
- **Fonts**: Local fonts only (no Google Fonts)
  - `Array-Bold` (Array-bold.otf) — logo, display headings, section labels
  - `Gambarino Regular` (gambarino-regular.otf) — all body text, subheadings, nav links
- **No CSS frameworks** — raw CSS only
- **Animations**: CSS transitions only

### Font Loading
```css
@font-face {
  font-family: 'Array';
  src: url('./assets/fonts/Array-bold.otf') format('opentype');
  font-weight: bold;
}

@font-face {
  font-family: 'Gambarino';
  src: url('./assets/fonts/gambarino-regular.otf') format('opentype');
  font-weight: normal;
}
```

Place both `.otf` files in `/assets/fonts/`.

---

## Design Principles

### Voice & Tone
The copy is direct, warm, and quietly furious. Lazarus is not interested in performing exclusivity — it exists as a deliberate correction to the art world's worst habits. The writing should feel like a friend who knows the industry well and is done pretending it works.

- **Short, declarative sentences.** No fluff.
- **Warmth over prestige.** Welcoming, not aspirational.
- **Conviction without aggression.** Critical of the industry, never bitter.
- Example register: *"The art world was built to keep most people out. We're fixing that."*

### Color Palette
Use CSS custom properties throughout:
```css
:root {
  --black: #000000;
  --yellow: #e2ce3a;
  --white: #FEFEFE;
}
```
- **Default**: white `#FEFEFE` text on black `#000000` background
- **Accent**: golden yellow `#e2ce3a` for hover states, active links, key punctuation, and CTA button backgrounds
- No gradients. No shadows. No other colors.

### Typography
- Display / Hero type: `Array`, bold, large — clamp(56px, 10vw, 128px)
- Body text: `Gambarino`, 16–18px, line-height 1.7
- Section labels: `Array`, small, tracked wide (letter-spacing: 0.15em), uppercase
- All type is either `--white` or `--yellow` on `--black` background

### Layout & Spacing
- Max content width: 1080px, centered
- Generous vertical padding per section: 100px–140px
- Sharp corners everywhere: `border-radius: 0`
- No card shadows, no box decorations — structure through spacing and type
- Mobile-first, fully responsive

### Interactions
- Link hover: color shifts to `--yellow`
- CTA button: `--yellow` background, `--black` text — on hover, invert or lighten slightly
- Smooth scroll: `scroll-behavior: smooth`
- All transitions: 250ms ease

---

## Page Structure

### 1. Navigation (fixed top)
- Left: **LAZARUS** in `Array`, small caps or uppercase
- Right: anchor links — `Artists`, `About`, `Visit`, `Contact`
- Background: `--black`, no border
- On scroll: stays fixed, perhaps a subtle 1px bottom border in `--yellow`

### 2. Hero Section
- Near-full viewport height
- Large `Array` headline — something like:
  *"Art was never meant to be this cold."*
  or *"For the artists who stayed anyway."*
- Gambarino subline (1–2 sentences): position Lazarus as the correction
  e.g. *"Lazarus is a bar and gallery built for emerging artists and the collectors who want to find them."*
- CTA button: **"Submit Your Work"** — anchors to #contact
- Small label above headline in `Array` tracked uppercase: `NEW YORK — BAR & GALLERY`

### 3. The Problem (Why We Exist)
- Two-column layout on desktop, single column on mobile
- Left column: headline in `Array` — *"The art world isn't broken by accident."*
- Right column: 2–3 short paragraphs in `Gambarino` drawn from The Story and Why We Do What We Do:
  - Galleries are coldest when they should be warmest
  - The 50/50 split is predatory
  - Collectors outside the inner circle are ignored
- Keep copy tight — this is not a blog post, it's a gut-punch

### 4. How Lazarus Works
- Three-column text grid on desktop (no icons, use `Array` numerals: 01, 02, 03)
- **01 — The Bar**: Creates community, economic sustainability, and a reason to linger
- **02 — The Gallery**: Rotating shows featuring emerging artists, open during bar hours — no appointment needed
- **03 — The Split**: Lazarus takes 20%. Artists keep 80%. Full stop.
- Section label above in tracked `Array`: `HOW IT WORKS`

### 5. For Artists — Primary CTA Section
- Full-width section, `--yellow` background, `--black` text
- Large `Array` headline: *"Your work belongs here."*
- 2–3 sentences in `Gambarino`: Lazarus is actively looking for emerging artists. No MFA required. No gatekeeping. You keep 80% of every sale.
- Prominent button: **"Get in Touch"** — `--black` background, `--yellow` text, links to mailto or anchors to contact form
- This section should feel like a billboard

### 6. For Collectors
- Back to `--black` background
- Short section — 2–3 sentences in `Gambarino` acknowledging that new collectors deserve the same attention as established ones
- No separate CTA — this feeds into the overall brand warmth

### 7. Visit / Hours
- Simple, clean: address, hours, neighborhood
- Maybe a single line of flavor copy in `Gambarino` italics:
  *"Come for a drink. Leave with something on your walls."*

### 8. Contact / Artist Submissions
- `id="contact"` — anchor target for all CTAs
- Simple form: Name, Email, Message, optional "Attach work samples" file input
- Submit button in `--yellow` with `--black` text
- Above the form, a short `Array` headline: *"Submit Your Work"*
- Below: secondary contact email for general inquiries

### 9. Footer
- Minimal: **LAZARUS** wordmark left, `© 2025` right
- Social links (Instagram, etc.) centered or right-aligned
- 1px top border in `--yellow`

---

## File Structure
```
/
├── index.html
├── style.css
├── main.js
└── assets/
    ├── fonts/
    │   ├── Array-bold.otf
    │   └── gambarino-regular.otf
    └── images/
```

---

## Code Quality Rules
- CSS custom properties for all colors, fonts, spacing
- Semantic HTML: `<nav>`, `<section>`, `<footer>`, `<form>`
- No inline styles
- All images require `alt` text
- Focus states visible (use `--yellow` outline)
- Form must be accessible: labeled inputs, clear submit state

---

## Copy Principles (reference for all generated text)
These are the core beliefs Lazarus is built on — all copy should reflect at least one:

1. The art world's coldness is a choice, not a law
2. Emerging artists deserve non-predatory economics (80/20, not 50/50)
3. Collectors at every level deserve warmth and education
4. A bar isn't a compromise — it's the point
5. Community is the product

---

## What to Avoid
- Any language that sounds like a startup pitch
- Prestige signaling ("curated," "bespoke," "exclusive")
- Drop shadows, rounded corners, gradients
- Hero images unless intentional and art-directed
- Emoji anywhere in the UI
- Generic gallery-website energy (white walls, Helvetica, sterile spacing)
