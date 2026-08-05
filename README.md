# Mirja Riyadh — Senior BIM Modeler & Revit Specialist Portfolio

A refactored, high-performance, single-page production portfolio website for Mirja Riyadh, BIM Specialist and Revit Modeler.

## 📁 Directory Structure

```text
/
├── index.html               # Main unified HTML structure with full accessibility & SEO
├── css/
│   ├── style.css            # Global variables (:root), resets, base layout & typography
│   ├── components.css       # Glass cards, buttons, nav, timeline, filter bar, modal, forms
│   ├── animations.css       # Keyframes, hover states, entrance transitions & scroll reveals
│   └── responsive.css       # Media queries, mobile breakpoints & accessibility overrides
├── js/
│   ├── main.js              # Typewriter effect, single IntersectionObserver, parallax & form
│   └── projects.js          # Project dataset, dynamic card rendering, filter & modal gallery
├── assets/
│   ├── images/              # Project image assets directory
│   ├── icons/               # SVG & icon assets directory
│   └── fonts/               # Web font assets directory
├── metadata.json            # Application metadata
└── README.md                # Technical documentation
```

## 🚀 Key Features & Performance Engineering

- **Unified Single-Page Architecture**: All sections merged in exact chronological sequence:
  `Hero -> About -> Skills -> Experience -> Projects -> Testimonials -> Contact -> Footer`
- **Zero Duplicate CSS**: Extracted global variables, resets, card utilities, and keyframes into modular stylesheets.
- **Single Observer Event Loop**: Optimized performance using a single `IntersectionObserver` instance for viewport reveal triggers, progress lines, and number counters.
- **Enhanced Accessibility (WCAG AA)**: Semantic HTML tags (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`), keyboard skip links, `aria-label`, focus visible rings, and `prefers-reduced-motion` handling.
- **Complete SEO**: Pre-configured with OpenGraph cards, Twitter cards, meta descriptions, canonical URL placeholders, and JSON-LD structured data (`Person` schema).
- **Responsive Fluid Layout**: Tested across desktop, laptop, tablet, and mobile displays with responsive typography (`clamp()`).

## 🛠️ Tech Stack

- **HTML5**: Semantic document markup
- **CSS3**: Custom Properties, Flexbox, Grid, Glassmorphism, CSS Animations
- **ES6+ JavaScript**: Vanilla JS, Intersection Observer API, Event Delegation
- **Typography**: Space Grotesk, Inter, JetBrains Mono
