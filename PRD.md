# Cypin Bridge — Production UI/UX Overhaul PRD

## Document Info
- **Version**: 1.0
- **Author**: UI/UX Audit & Redesign Spec
- **Scope**: Complete frontend visual/UX production readiness
- **Approach**: Fix-in-place (no rewrite, no new frameworks)

---

## 1. TYPOGRAPHY OVERHAUL

### 1.1 Body Text Weight Fix
- **File**: `src/index.css` line 62
- **Current**: `font-weight: 300` (DM Sans Light)
- **Change to**: `font-weight: 400` (DM Sans Regular)
- **Why**: Weight 300 on dark backgrounds with gray text is illegible. Regular weight maintains elegance while being readable.

### 1.2 Heading Weight Scale
- **Current**: Every heading uses `font-light` (300) regardless of size
- **Change**:
  - `>= 3rem` (KineticTitle, hero h1): Keep `font-light` (300) — display sizes breathe at thin weights
  - `< 3rem` (card titles, section h3/h4): Change to `font-normal` (400) — serifs need substance at small sizes
- **Affected components**:
  - `PillarCard.tsx` → `font-light` → `font-normal`
  - `ServiceCard.tsx` → `font-light` → `font-normal`
  - `VerticalCard.tsx` → `font-light` → `font-normal`
  - `Footer.tsx` column headings
  - `Navbar.tsx` brand text
  - `Careers.tsx` role titles
  - `Advisory.tsx` "Why Advisory?" heading
  - `Contact.tsx` contact info headings

### 1.3 KineticTitle Size Reduction (Non-Hero)
- **File**: `src/components/motion/KineticTitle.tsx` line 19
- **Current**: `clamp(2.2rem, 7vw, 6.5rem)` — used identically for hero AND all section titles
- **Change**: Accept a `variant` prop:
  - `variant="hero"`: `clamp(2.4rem, 7vw, 6.5rem)` (keep current for hero only)
  - `variant="section"` (default): `clamp(1.8rem, 5vw, 4rem)` — still impactful but doesn't scream
- **Impact**: All 6 KineticTitle usages on the homepage become proportional instead of competing

### 1.4 Eyebrow Text Size
- **File**: `src/index.css` line 162
- **Current**: `font-size: 0.7rem` (11.2px)
- **Change to**: `font-size: 0.75rem` (12px), `font-weight: 500`
- **Why**: Below minimum legible size; adding medium weight makes it functional, not decorative

---

## 2. COLOR PALETTE FIXES

### 2.1 Body Text Contrast (WCAG AA Compliance)
- **File**: `src/index.css` line 20
- **Current**: `--muted-color: #7a8095` (contrast ratio ~3.8:1 on #06080d — FAILS AA)
- **Change to**: `--muted-color: #9ba1b5` (contrast ratio ~5.5:1 — PASSES AA)
- **Impact**: Every paragraph, description, bullet point, and label across the entire site

### 2.2 Background Layer Differentiation
- **Current** (nearly indistinguishable):
  - `--bg: #06080d`
  - `--bg2: #0d1118`
  - `--bg3: #111822`
- **Change to** (perceptible difference):
  - `--bg: #06080d` (keep — this is the base)
  - `--bg2: #0c1320` (slightly more blue, more separation)
  - `--bg3: #141c2b` (clearly distinct card surface)
- **Why**: On uncalibrated monitors, the current bg/bg2/bg3 look identical

### 2.3 Card Border Visibility
- **File**: `src/index.css` line 21 and 143
- **Current**: `--line: rgba(255,255,255,0.07)` — invisible on most displays
- **Change to**: `--line: rgba(255,255,255,0.10)`
- **Hover state**: Keep `rgba(62,232,160,0.3)` — good contrast
- **Additional**: Add a subtle default left border accent on PillarCards and ServiceCards so users know they're distinct elements

### 2.4 Strategic Accent Color Usage
- **Gold (`--gold: #c8a96e`)** — currently only used on 1 service tag
  - New usage: Primary CTA on hero ("Partner With Us") gets gold background instead of teal to create hierarchy between primary and secondary actions
  - Footer "Contact Us" links
- **Cyan (`--accent2: #6dcfff`)** — currently only on eyebrows
  - New usage: Stat numbers on the Markets section, "Open" badges on Careers page
  - Link hover states for non-CTA text links

### 2.5 Copyright Year
- **File**: `Footer.tsx` line 53
- **Current**: Hardcoded `© 2025`
- **Change to**: `© {new Date().getFullYear()}`

---

## 3. IMAGERY — The Biggest Gap

### 3.1 Image Strategy
All images sourced from Unsplash (free commercial license, no attribution required). Images will be downloaded to `public/images/` and optimized. Each image will have a dark overlay applied via CSS to maintain the dark aesthetic.

### 3.2 Hero Section Background
- **Source**: [Microscope in dark lab](https://unsplash.com/photos/white-microscope-on-top-of-black-table-gKUC4TMhOiY) — white microscope on black table, moody lighting
- **Implementation**: Replace the pure CSS `hero-bg` gradient with this image as a background, overlaid with the existing radial gradients at reduced opacity (0.85 dark overlay)
- **Fallback**: Keep the CSS gradient as fallback while image loads

### 3.3 Mission Section Visual (Replace Animated Circles)
- **Current**: `MissionVisual()` component — 3 animated concentric circles with a glowing dot. Communicates nothing.
- **Replace with**: [National Cancer Institute lab photo](https://unsplash.com/photos/GcrSgHDrniY) — scientist working with test tubes, real laboratory setting
- **Implementation**: `<img>` with `object-fit: cover`, rounded corners, subtle parallax maintained

### 3.4 Advisory Section — Add Visual Anchor
- **Source**: [DNA helix blue background](https://unsplash.com/photos/a-close-up-of-a-structure-with-a-blue-background-2GEr4fLZt8A) — abstract DNA structure, blue tones that match our accent2
- **Placement**: Small accent image (300x300, rounded) floated right of the intro paragraph on the Advisory page

### 3.5 Markets Section — India Visual
- **Source**: [Mumbai skyline](https://unsplash.com/s/photos/mumbai-skyline) — modern India cityscape
- **Implementation**: Full-width band image between the stats and the vertical cards, with dark gradient overlay and a text overlay: "India's Bio-Economy: $300B by 2030"

### 3.6 Services Page — Section Headers
- **Source**: [Lab bench with equipment](https://unsplash.com/photos/a-laboratory-bench-with-scientific-equipment-z_w9KovAwYk)
- **Implementation**: Subtle background image behind the page header on the Services page, heavily overlaid (90% dark)

### 3.7 Trust/Logo Bar (New Section)
- **Placement**: Between the Marquee and Value Bar on the homepage
- **Content**: "Trusted by teams working with" + row of placeholder partner/institution logos (styled as grayscale, subtle opacity)
- **Implementation**: Horizontal flex row, grayscale filter, opacity 0.5, hover to full opacity
- **Note**: Use placeholder text-based "logos" initially (styled company names) — client can replace with real logos later

### 3.8 Careers Page Visual
- **Source**: [Pharmaceutical technician in sterile environment](https://unsplash.com/photos/pharmaceutical-technician-in-sterile-environment-working-on-production-of-pills-at-pharmacy-factory-aBOMEV8i4ns)
- **Implementation**: Header banner image for the Careers page (behind the KineticTitle)

---

## 4. ANIMATION RESTRAINT

### 4.1 Particle Field Reduction
- **File**: `src/components/motion/ParticleField.tsx`
- **Current**: 40 particles, each a separate Framer Motion div with infinite animation
- **Change**: Reduce to 18 particles. Increase individual size range to `2-4px` so fewer particles still feel present
- **Add**: `prefers-reduced-motion` check — render 0 particles if user prefers reduced motion

### 4.2 KineticTitle Animation — Hero Only
- **File**: `src/components/motion/KineticTitle.tsx`
- **Current**: Slide-up animation on every instance (plays 6 times on homepage scroll)
- **Change**: Add `animate` prop (default `true`). Set to `false` for non-hero instances
- **Non-hero behavior**: Simple `opacity: 0 → 1` fade-in (0.5s) instead of the dramatic slide-up
- **Hero behavior**: Keep the slide-up reveal

### 4.3 Hero Scroll Height
- **File**: `Home.tsx` line 51
- **Current**: `height: '200vh'` — user scrolls 2x viewport before content appears
- **Change to**: `height: '160vh'` — still provides parallax but less dead-zone
- **Also**: Add `scroll-snap-type: y proximity` on the hero container for smoother entry into the marquee

### 4.4 Hover Lift Discipline
- **Current**: Every card type has `whileHover={{ y: -4 }}`
- **Change**:
  - `PillarCard`: Remove hover lift, keep border-color change only
  - `ServiceCard`: Remove hover lift, keep border-color change only
  - `VerticalCard`: Remove hover lift, keep border-color change only
  - **Join CTA cards** (Home.tsx): KEEP hover lift — these are primary interactive elements
- **Why**: When everything lifts, nothing feels special

### 4.5 Reduced Motion Support (Global)
- **New file**: `src/hooks/use-reduced-motion.ts`
- **Implementation**: Hook that reads `prefers-reduced-motion: reduce` media query
- **Apply to**:
  - `ParticleField` → render nothing
  - `KineticTitle` → instant display, no animation
  - `AnimatedStat` → show final number immediately
  - `MarqueeStrip` → static display (no scroll)
  - `StickyFeatureSection` → no parallax transform
  - Hero parallax → disabled
  - `atmosphericPulse` and `meshShift` CSS animations → paused via `@media (prefers-reduced-motion: reduce)`

---

## 5. VISUAL HIERARCHY & LAYOUT

### 5.1 Page Differentiation
Each inner page gets a distinct header treatment:

| Page | Header Treatment |
|------|-----------------|
| **Advisory** | Subtle DNA/helix background image (10% opacity) behind title area |
| **Services** | Lab equipment background image (10% opacity) + teal top gradient line |
| **Markets** | Dark blue gradient shift (slightly blue-tinted bg) + India map SVG accent |
| **Join** | Clean, form-focused — no background image (intentional whitespace feel) |
| **Careers** | Pharma facility background image (10% opacity) |
| **Contact** | Mesh gradient (existing) made slightly more visible |

### 5.2 Homepage Visual Breaks
Insert between existing sections:

1. **After Marquee**: Trust/Logo bar (gray text-logos on dark strip)
2. **Between Advisory & Services sections**: Full-width divider — thin gradient line (teal→cyan→transparent) spanning 60% of viewport width, centered
3. **Before Contact Strip**: A testimonial/quote card with distinct styling (larger text, italic serif, gold accent border)

### 5.3 Container Width
- **Current**: `max-w-7xl` (1280px) everywhere
- **Change**: Keep `max-w-7xl` for text-heavy sections, but use `max-w-[1400px]` for card grid sections (Advisory pillars, Services grid, Markets verticals) where cards need breathing room

### 5.4 Join Page Layout Enhancement
- **Current**: Single column `max-w-3xl` — long scrolling form with dead space on sides
- **Change to**: `max-w-5xl` with 2-column layout on desktop:
  - Left column (60%): The form
  - Right column (40%): Trust signals sidebar with:
    - "What to expect" timeline (3 steps with icons)
    - Response time badge ("5-7 business days")
    - Confidentiality notice
    - Contact info for questions

### 5.5 Footer Enhancement
Add to footer:
- **Row 1**: Existing 3-column layout (brand, nav, contact) — keep
- **Row 2 (new)**: Trust strip — "ISO Compliant · CDSCO Advisory Experts · Confidential Process" in small caps
- **City update**: "India · Global" → "Hyderabad, India · Serving Global Clients"

---

## 6. FORM UX OVERHAUL

### 6.1 Placeholders on All Inputs
Add meaningful placeholder text to every form field:

**Manufacturer Form:**
| Field | Placeholder |
|-------|------------|
| Company Name | `e.g., Roche Diagnostics` |
| Contact Person | `e.g., John Smith` |
| Work Email | `you@company.com` |
| Country of Origin | `e.g., Germany` |
| Product Description | `Describe your product's key features, intended use, and technical specifications...` |
| Certifications | `e.g., CE, FDA 510(k), ISO 13485` |
| Additional Context | `Any additional information about your India market entry goals...` |

**Distributor Form:**
| Field | Placeholder |
|-------|------------|
| Company Name | `e.g., BioScience India Pvt. Ltd.` |
| Contact Person | `e.g., Priya Sharma` |
| Work Email | `you@company.com` |
| City / State | `e.g., Hyderabad, Telangana` |
| Years in Operation | `e.g., 8` |
| Certifications | `e.g., ISO 9001, ISO 13485` |
| Distribution Network | `Describe your geographic reach, key accounts, and institutional partnerships...` |

**Contact Form:**
| Field | Placeholder |
|-------|------------|
| Full Name | `Your full name` |
| Email | `you@company.com` |
| Organization | `Your company or institution` |
| Subject | `e.g., Market entry inquiry for IVD products` |
| Message | `Tell us about your inquiry...` |

**Career Form:**
| Field | Placeholder |
|-------|------------|
| Full Name | `Your full name` |
| Email | `you@company.com` |
| Expertise | `Describe your domain expertise, years of experience, and key achievements in your field...` |

### 6.2 Custom Styled Checkboxes
- **Current**: Native `<input type="checkbox">` with `accent-[var(--accent)]` — inconsistent across browsers
- **Change**: Use shadcn/ui `<Checkbox>` component (already installed at `src/components/ui/checkbox.tsx`)
- **Style**: Teal border, teal fill on check, smooth transition
- **Apply to**: All checkbox groups in ManufacturerForm and DistributorForm

### 6.3 Tab State Persistence (Join Page)
- **Current**: Switching tabs remounts forms, losing all data
- **Fix**: Render both forms always, use `display: none` / `block` (or `hidden` class) instead of conditional rendering
- **Implementation**: Replace the ternary `{tab === 'manufacturer' ? <ManufacturerForm /> : <DistributorForm />}` with both forms wrapped in divs that toggle visibility

### 6.4 Enhanced Success States
- **Current**: Single green text line after submission
- **Change to**: A proper success card with:
  - Checkmark icon (Lucide `CheckCircle2`)
  - Bold "Submission Received" heading
  - Description of next steps
  - Expected response timeline
  - "Submit another" link to reset the form
  - Subtle entrance animation (scale 0.95 → 1, opacity 0 → 1)

### 6.5 Form Validation UX Improvements
- Add `aria-invalid` attribute to fields with errors
- Add `aria-describedby` linking error messages to fields
- Scroll to first error on failed submission
- Red border on invalid fields (not just text below)

---

## 7. MOBILE UX FIXES

### 7.1 Scroll to Top on Route Change
- **New component**: `src/components/shared/ScrollToTop.tsx`
- **Implementation**: `useEffect` on `location.pathname` calling `window.scrollTo(0, 0)`
- **Place in**: `App.tsx` inside the Router

### 7.2 Mobile Drawer Backdrop
- **File**: `Navbar.tsx`
- **Current**: Drawer opens with no overlay; background content is interactive
- **Add**: Semi-transparent backdrop `<motion.div>` with `bg-black/60` behind the drawer
- **Behavior**: Click backdrop to close menu
- **Also**: Add `overflow: hidden` to body when drawer is open to prevent background scroll

### 7.3 Mobile Button Consistency
- **File**: Hero section in `Home.tsx`
- **Current**: Buttons stack vertically on mobile but have inconsistent widths
- **Fix**: Add `w-full sm:w-auto` to both hero CTA buttons so they're full-width on mobile, auto on desktop

### 7.4 Mobile Form Improvements
- Increase touch target for checkboxes to 44x44px minimum
- Add `inputmode="email"` to email fields, `inputmode="numeric"` to number fields
- Sticky submit button on long forms (manufacturer form) on mobile

---

## 8. ACCESSIBILITY

### 8.1 Skip to Content Link
- **New**: Add visually-hidden skip link as first element in `App.tsx`
- **Target**: `<main id="main-content">` wrapping page content
- **Style**: Visible only on `:focus` — slides in from top with teal background

### 8.2 Semantic Form Markup
- Wrap form sections in `<fieldset>` with `<legend>`
- Add `aria-required="true"` to required fields
- Add `aria-invalid="true"` to fields with validation errors
- Link error messages with `aria-describedby`

### 8.3 Reduced Motion CSS
Add to `index.css`:
```css
@media (prefers-reduced-motion: reduce) {
  .hero-bg { animation: none; }
  .marquee-track { animation: none; }
  .mesh-gradient { animation: none; }
  .diagonal-card { transition: none; }
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### 8.4 Accessible Scroll Indicator
- **Current**: Raw `↓` Unicode character in hero
- **Replace with**: `<button aria-label="Scroll to content">` with Lucide `ChevronDown` icon
- **On click**: Smooth scroll to the section below the hero

### 8.5 Image Alt Text
All new images will have descriptive alt text:
- Hero: `alt="Microscope in a modern laboratory with dark ambient lighting"`
- Mission: `alt="Scientist analyzing samples in a biotech research laboratory"`
- Markets: `alt="Modern Mumbai skyline representing India's growing tech economy"`
- etc.

---

## 9. PERFORMANCE

### 9.1 Image Optimization
- All images downloaded at max 1920px width
- Convert to WebP format with JPEG fallback
- Use `loading="lazy"` on all below-fold images
- Hero image uses `loading="eager"` and `fetchpriority="high"`

### 9.2 Font Loading
- Add `font-display: swap` to the Google Fonts import to prevent FOIT (Flash of Invisible Text)
- Preconnect to Google Fonts CDN in `index.html`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ```

### 9.3 Reduced Animation Overhead
- ParticleField: 40 → 18 divs (55% reduction in animated elements)
- Remove `whileHover` from non-interactive cards (removes Framer Motion event listeners)
- KineticTitle: Non-hero instances use CSS transition instead of Framer Motion

---

## 10. NEW COMPONENTS TO CREATE

| Component | File | Purpose |
|-----------|------|---------|
| `ScrollToTop` | `src/components/shared/ScrollToTop.tsx` | Scroll to top on route change |
| `TrustBar` | `src/components/shared/TrustBar.tsx` | Logo/partner trust strip |
| `SuccessState` | `src/components/shared/SuccessState.tsx` | Reusable form success card |
| `Testimonial` | `src/components/shared/Testimonial.tsx` | Quote card with distinct styling |
| `PageHeader` | `src/components/shared/PageHeader.tsx` | Unified inner page header with optional bg image |
| `useReducedMotion` | `src/hooks/use-reduced-motion.ts` | Respect prefers-reduced-motion |

---

## 11. FILES MODIFIED (Summary)

| File | Changes |
|------|---------|
| `src/index.css` | Body weight, eyebrow size, colors, reduced-motion media query, new trust-bar styles |
| `tailwind.config.ts` | Updated cypin colors (bg2, bg3, muted) |
| `src/pages/Home.tsx` | Hero height, imagery, trust bar, visual breaks, testimonial, button classes |
| `src/pages/Advisory.tsx` | PageHeader component, heading weights |
| `src/pages/Services.tsx` | PageHeader component, heading weights |
| `src/pages/Markets.tsx` | India visual band, heading weights |
| `src/pages/Join.tsx` | 2-col layout, tab persistence, placeholders, success states, checkboxes |
| `src/pages/Contact.tsx` | Placeholders, success state, heading weights |
| `src/pages/Careers.tsx` | PageHeader, placeholders, success state, heading weights |
| `src/components/motion/ParticleField.tsx` | 40→18 particles, reduced-motion |
| `src/components/motion/KineticTitle.tsx` | variant prop, animate prop, size scale |
| `src/components/motion/AnimatedStat.tsx` | Reduced-motion support |
| `src/components/motion/MarqueeStrip.tsx` | Reduced-motion support |
| `src/components/motion/StickyFeatureSection.tsx` | Reduced-motion, real image support |
| `src/components/cards/PillarCard.tsx` | Font weight fix, remove hover lift |
| `src/components/cards/ServiceCard.tsx` | Font weight fix, remove hover lift |
| `src/components/cards/VerticalCard.tsx` | Font weight fix, remove hover lift |
| `src/components/layout/Navbar.tsx` | Backdrop on mobile, brand weight |
| `src/components/layout/Footer.tsx` | Dynamic year, trust strip, location update |
| `src/App.tsx` | ScrollToTop, skip-to-content, main landmark |
| `index.html` | Font preconnect hints |

---

## 12. IMAGE MANIFEST

Images to download to `public/images/`:

| Filename | Source | Usage | Dimensions |
|----------|--------|-------|------------|
| `hero-microscope.jpg` | [Unsplash: gKUC4TMhOiY](https://unsplash.com/photos/white-microscope-on-top-of-black-table-gKUC4TMhOiY) | Hero background | 1920x1080 |
| `mission-lab.jpg` | [Unsplash: GcrSgHDrniY](https://unsplash.com/photos/GcrSgHDrniY) | Mission section visual | 800x800 |
| `dna-abstract.jpg` | [Unsplash: 2GEr4fLZt8A](https://unsplash.com/photos/a-close-up-of-a-structure-with-a-blue-background-2GEr4fLZt8A) | Advisory page accent | 600x600 |
| `lab-bench.jpg` | [Unsplash: z_w9KovAwYk](https://unsplash.com/photos/a-laboratory-bench-with-scientific-equipment-z_w9KovAwYk) | Services page header bg | 1920x600 |
| `pharma-facility.jpg` | [Unsplash: aBOMEV8i4ns](https://unsplash.com/photos/pharmaceutical-technician-in-sterile-environment-working-on-production-of-pills-at-pharmacy-factory-aBOMEV8i4ns) | Careers page header bg | 1920x600 |
| `abstract-glow.jpg` | [Unsplash: 2eq4SJqiDmg](https://unsplash.com/photos/glowing-blue-and-purple-lines-against-a-dark-background-2eq4SJqiDmg) | Contact page background accent | 1200x800 |

---

## 13. ACCEPTANCE CRITERIA

The site is production-ready when:

- [ ] All body text passes WCAG AA contrast ratio (4.5:1 minimum)
- [ ] All interactive elements have 44px minimum touch targets
- [ ] `prefers-reduced-motion` is fully respected (zero animations when enabled)
- [ ] All forms have placeholders, proper aria attributes, and enhanced success states
- [ ] Tab switching on Join page preserves form data
- [ ] At least 6 real photographs are integrated into the design
- [ ] Trust/social proof section exists on the homepage
- [ ] Each inner page has a visually distinct header
- [ ] Skip-to-content link works for keyboard navigation
- [ ] Mobile drawer has a backdrop overlay
- [ ] Scroll-to-top fires on every route change
- [ ] No heading uses font-weight 300 below 3rem size
- [ ] Font preconnect hints are in index.html
- [ ] All images have descriptive alt text
- [ ] Footer shows dynamic year and real location
- [ ] Hero scroll zone is reduced from 200vh to 160vh
- [ ] Particle count reduced from 40 to 18
