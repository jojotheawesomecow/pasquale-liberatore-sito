# Design research 2025–2026 — alternative directions B (ultra-modern) and C (middle ground) for pasqualeliberatore.it

Date: 2026-09-08. Method: 91 live sites fingerprinted from raw HTML + linked CSS (fonts via `@font-face`/`font-family`, colours via CSS custom properties and hex frequency, libraries via script names, layout/motion via CSS signals), plus award-gallery listings (Awwwards, CSSDA, Siteinspire, httpster, minimal.gallery, godly→recent.design), trend articles, Codrops build write-ups, Google Fonts metadata and the Fontshare API. ~60 WebFetch/WebSearch calls and ~100 raw fetches. Raw fingerprints are in `research/raw/_*.txt`; contrast math in section 3.

Not reachable (rate-limited / bot-blocked, 3–4 attempts each): antonygormley.com (429), hauserwirth.com (429), fondazioneprada.org (403), land-book.com (Cloudflare). Everything else below was actually inspected.

---

## 1. What award-winning / trend-setting art sites look like right now

### 1.1 Award galleries — what is being rewarded (Aug–Sep 2026)

**Awwwards Sites of the Day, 8 Aug – 7 Sep 2026** (https://www.awwwards.com/websites/sites_of_the_day/): Why Zero; United Carriers (Bearplus); Gionatan Nese '26; Illoca (Unseen Studio); Trevor Noah (OFF+BRAND); Paul Kalkbrenner (HOLOGRAPHIK); Squarespace Foundations (Resn); ERA Residence = Site of the Month Aug (The First The Last); Aardvark Book Club (FUTURE THREE); HOBRO DIGITAL; Decathlon Yestalgia (index); Sharplink (Studio Freight / darkroom.engineering); AI in Design Report 2026 (++hellohello); MIU MIU "A House that we shaped" (Merci Michel); /zeroz (SHIFTBRAIN); Kononenko Architectural Bureau (Reksa Andhika); The State of the Gallery (Majo Puterka / mesh3d); Oimachi; Cipher (Magnetism); LIKOVA (Vide Infra); Michael Gatt (Synchronized Studio); The Watch (60fps); SSTR; PX PUSH; HAOQI.DESIGN; Mosby's Files (Tubik); Revelatio Studio; Studio K95; NOTHIN' (Thomas Carré); Produx Design; Vero New-York (Rodéo). Awwwards' own UI is set in **Inter Tight Variable**.

Culture/art entries with published palettes and stacks:
- **The State of the Gallery** — https://mesh3d.gallery/the-state-of-the-gallery — SOTD 22 Aug 2026, 7.3/10. Single colour **#08090D**; Next.js + Three.js + React; fonts **Geist, Geist Mono, Overused Grotesk** (all free); acid **#ECFF3E** highlights; `backdrop-filter` ×19, `mix-blend-mode` ×8, 12vw type. Elements: "oil slick + particles bulge" hover, "glass video tiles assemble on scroll", scene transitions, click pulse. (https://www.awwwards.com/sites/the-state-of-the-gallery)
- **Michael Gatt** (Synchronized Studio) — SOTD 18 Aug 2026, 7.45. Palette **#0F0F0F / #CFCFCF** (12.3:1); WebGL + Vue/Nuxt; scroll-based storytelling About page, interactive loader. Synchronized's own site: Nuxt + GSAP ×11, `clip-path` ×14, marquee, `cursor:none`, 12–20vw type, pale green #DEEBC8.
- **Kononenko Architectural Bureau** — SOTD 23 Aug 2026, 7.27. Palette **#FFFFFF / #000000** only; tags Clean, Minimal, Content architecture; hover animation on works, work-detail pages.
- **Goodman Gallery** — https://goodman-gallery.com — Honorable Mention 21 May 2026 (DashDigital). React/Next.js + Sanity + AWS, **#000/#fff**, Lenis, Helvetica Neue + WT Kormelink (serif); preloader, artwork detail cards, menu interaction, exhibition slider, "News Feed" sidebar, location cards, filtering, enquiry basket, currency switch. CSS: `grid-template-columns` ×54, `position:sticky` ×18, `mix-blend-mode` ×11, `filter:grayscale` hover ×5.
- **Tracing Art** (Getty × Resn) — https://www.getty.edu/tracingart/ — SOTD 22 Jul 2025, 7.68. **#FFFFFF + #DAE2E8**; scroll animations, data visualisation, hover effects; "Big background images, Clean".
- Also listed: Rabo Art Collection (HM 10 Sep 2025), Cornwall Museum & Art Gallery (nominee 7 Jan 2026), Arkansas Museum of Fine Art (institutions), Tresmares Capital (SOTD 12 Jun 2026), Museum of Modern Art in Warsaw (Huncwot, HM 2013 — still the reference for the black/white typographic museum site; current site analysed below).

**CSS Design Awards WOTD, 30 Aug – 7 Sep 2026** (https://www.cssdesignawards.com/): BUNQ LABS 8.29, Numa, LAYR Media, Heirest, **Maria Vasilyeva portfolio** 8.16, MECHA, **Quintin Lodge** 8.10, **Jesper Landberg** 8.20, Maison AUGE. Portfolio/studio sites dominate.
- Maria Vasilyeva — https://www.mariavasilyeva.com — tokens `--white:#f9f9f9 --black:#131313 --dark-grey:#626262 --light-grey:#e9e9e9`; serif display + mono; nav numbered "(01) Notes (02) Melody (03) Overture (04) Jazz"; `clip-path` ×11, negative tracking, uppercase.
- Quintin Lodge — https://www.quintinlodge.com — Sanity; tokens `--white:#f2f2f2 --black:#010101 --gray:#b1b1b1 --ink:#1e1e1e --accent:#3e00cf` (electric violet) plus a **design-grid overlay** (`--g-col-color`); uppercase ×27, `mix-blend-mode`, grayscale hover.
- Jesper Landberg — https://jesperlandberg.com — Nuxt + Three.js + GSAP; one custom sans; index toggle **"Featured / Full"**; gold #D9A441.

**Siteinspire — Galleries & Museums** (https://www.siteinspire.com/websites/category/galleries-and-museums): Kronborg, James Joyce Tower, Centre de la photographie Genève, **Mennour**, The Minories, Foam, **Southern Guild**, **Francis Gallery**, MCA Australia, **LAS Art Foundation**, La Galerie Dior, Studio Museum Harlem, **Lévy Gorvy Dayan**, West Space, White Cube, PAMM, Garage chronicle, Blue Oyster, Headlands, **Galeria Foco**, Kunsthaus Digilab, Pinault Collection, **Huxley-Parlour**, **Schierke Seinecke**, Southard Reid, Grand Rapids Art Museum. Siteinspire tag counts across its index: Typographic 2,102 · Minimal 814 · Grid layout 670 · Unusual layout 665 — "typographic" is the dominant style tag on the platform.

**httpster** (https://httpster.net/) self-describes as "typographic, minimal, brutalist vibes"; art picks: Jacky Winter Gallery, Visual Journal (visualjournal.it — Metro Sans, `--bg:white --text:black --text-light:dimgray`), Patrick Mason Studio (Gatsby + Tailwind + Work Sans variable), Snøhetta. **minimal.gallery**: Van Gogh Museum, Locomotive, Kai Blamey (ABC Schengen, black/white, list view), Jason Bergh. **godly.website** now redirects to recent.design (a generic inspiration feed). **land-book** is behind Cloudflare.

### 1.2 Artist studio sites (what they actually run)

| Site | Stack | Type | Colour | Layout / features | Motion |
|---|---|---|---|---|---|
| Studio Olafur Eliasson — olafureliasson.net | custom app | **Lineto Circular** Book/Medium/Bold | light, #333 text | news-feed home; Current / Work / Explore (Archive, Video, Research map) / About; Cloudinary | none; `aspect-ratio`, sticky |
| Anish Kapoor — anishkapoor.com | server-rendered, ~no CSS | system | black on white | home = one continuous chronological list 2026→1990s, "text / images / search" toggle | none |
| Studio Tomás Saraceno — studiotomassaraceno.org | WordPress | **Sabon Next** (serif) + **FF Bau** (grotesk) | light | masonry grid, category filters (EXHIBITIONS / ARTWORKS / LARGE SCALE / DIALOGUE), uppercase nav | barba.js transitions, **`cursor:none` custom cursor**, `mix-blend-mode`, `clip-path`, type up to 11vw |
| Es Devlin — esdevlin.com | **Next.js + Sanity + Tailwind v4** | **Neue Haas Grotesk Text** (Typekit), `font-variation-settings` | `--color-black #000 --color-white #fff --color-grey #e6e4de` | nav = Es Devlin / Work / Information / Search; Work index offers **Grid + List + Spectrum + Timeline** views | `backdrop-filter`, sticky, `prefers-color-scheme` |
| Refik Anadol — refikanadol.com | WordPress + ajaxify | **Aktiv Grotesk** hairline→black | **dark #121212** | card sections, "arrow_outward" icons on nav | `backdrop-filter` ×34, `clip-path`, `cursor:none` |
| Jaume Plensa — jaumeplensa.com | Bootstrap 3 + jQuery | Open Sans + Roboto Slab | light | owl-carousel hero, isotope filters, **Map of Works**, works by medium, bibliography | dated stack |
| Alicja Kwade — alicjakwade.com | 2KB shell + flaunt.js | **Aktiv Grotesk** Regular | white/#767676 | uppercase, grid | lazysizes |
| Ugo Rondinone — ugorondinone.com | WP twentyfifteen child | Noto Sans/Serif + Inconsolata | light | lowercase nav (work · public sculpture · exhibition · book), infinite scroll | none |
| Arcangelo Sassolino — arcangelosassolino.it | WP Elementor | **ABC Whyte Medium** (Dinamo) | light | Works / Exhibitions | **Lenis** smooth scroll, Swiper, GSAP, Lottie |
| Not Vital — notvital.com | Cargo-type SPA | **Plain** (Optimo) | white, link #00f | scroll-snap, uppercase, type to 12vw | snap |
| Theaster Gates — theastergates.com | 2018 stack | Trade Gothic + Grotesque MT | black/white, gold #a28e68 | Studio / Exhibitions / Projects / Gallery; justifiedGallery | scrollreveal, Swiper 4, **jarallax parallax** (dated) |
| Wolfgang Tillmans — tillmans.co.uk | Next.js + Sanity | **ABC Otto Variable** (one variable serif, light + light italic) | white/#f5f5f5 | pure text index: Current Calendar / Installation View Archive / Publications / Lectures & Talks / Texts / Biography; "→" arrows | scroll-snap, sticky |
| Nico Vascellari — nicovascellari.com | **Cargo 3** | **ABC Diatype** + **Monument Grotesk Mono Variable** + Neue Haas Grotesk | white | thumbnail index (`data-view="thumbnail"`), photoswipe | marquee, `will-change` |
| Paola Pivi — paolapivi.com | WP + GSAP | Authentic Sans 90/130/150 + Inter var | `--color-text` flips white/black per page | scroll-snap sections | GSAP, marquee, `cursor:none` |
| Hiroshi Sugimoto — sugimotohiroshi.com | Squarespace | Futura PT | light | list/grid | barba, uppercase ×74 |
| Andreas Gursky — andreasgursky.com | custom | Archivo Narrow (Google) | white, blue #00b2ff | lowercase nav, de/en | `cursor:none` |
| Katharina Grosse | custom | — | b/w | — | barba, grayscale |
| Giuseppe Penone — giuseppepenone.com | **Nuxt** | **Söhne + Untitled Serif** (Klim) | #f7f7f4 | Works / Drawings / Editions / Words / News / About / Italiano | minimal |
| Daniel Arsham — danielarsham.com | Squarespace + Astro islands | Proxima Nova + Adobe Garamond | dark greys | uppercase ×67, type to 12vw | marquee, barba, `clip-path` ×56 |
| Barry X Ball — barryxball.com (marble) | Squarespace 7.1 | Libre Franklin | b/w | nav by series (Masterpieces, Portrait Sculptures, Scholars' Rocks) | masonry, `clip-path` ×129 |
| **Jago — jago.art** (marble, IT) | WP WPBakery Impreza, WPML IT/EN | **Outfit** (Google) | **dark headers/bg**, white type; `#f5f2ec` warm surfaces | Collezione / Jago / Discover / Contatti / Jago Museum; ticketing (Regiondo) | **GSAP + ScrollTrigger**, `filter:grayscale` hover ×538 (grey→colour), `cursor:none` |
| **Fabio Viale — fabioviale.it** (marble, IT) | WordPress | **BenchNine** (condensed) | light | works grouped by series/year (MONUMENTUM 2023, AURUM 2022, IN BETWEEN 2021, TRULY 2020 … 2004); IT/EN inline; nav Home / Contacts / Video | `clip-path` only |
| Tony Cragg — tony-cragg.com | custom | Europa (Typekit) | b/w | works by decade (2020–today … 1969–1979), On Paper, Info | uppercase |
| Peter Randall-Page — peterrandall-page.com (stone) | WP | Open Sans | light, orange #fc9847 | **Sculpture Map**, Sculpture / Drawings / Prints / Architectural, Essays and Interviews, E-newsletter | none |
| Helaine Blumenfeld (marble) | WP Bootstrap | IBM Plex Sans | light | Chronology, Sculpture, Commissions | swiper |
| Emily Young (stone) | WP WPBakery | system | light | Gallery, Writings | slick |
| Noguchi Museum — noguchi.org | WP | **NH Text/Display** (custom grotesk) + **Sabon** | #333230 ink, #767676, #d8d8d8 | Isamu Noguchi / Museum / Artworks (Collection, **Catalogue Raisonné**, **Public Works**) / Akari & Shop; 日本語 | barba, `cursor:none`, `data-theme` |
| Henry Moore Foundation | custom | Whitney | #242221 ink + pastel accent scale | See & Do / Discover & Research | `will-change` ×25 |
| Hepworth Wakefield | WP + Shopify | custom "Hepworth" | **#f3f2ed** warm + cyan #0ad6d6 | — | type 4.3–6vw, `clip-path` |
| Fondazione Arnaldo Pomodoro | WP WPBakery | Chromatica | light | IT/EN, Centenario | `clamp()` ×14 |
| Fondazione Merz | WP | **Univers + Cutive Mono** | red #e20612 | IT/EN | grayscale hover, `mix-blend-mode` ×14 |

### 1.3 Galleries and institutions

| Site | Stack | Type | Colour | Notable |
|---|---|---|---|---|
| Gagosian — gagosian.com | Next.js + Tailwind | **GT America** + **Minion Pro / Minion Condensed** (Typekit) + custom "Gagosian Headline" serif | #111 ink, #b2b2b2/#909090 greys | `data-theme` ×162 (section theming), lowercase ×6, tight tracking; nav Exhibitions · Artists · Fairs & Collecting · Quarterly · News · Locations · Shop · Premieres · Subscribe · Search |
| David Zwirner — davidzwirner.com | Next.js + Sanity + Shopify | Avenir Next | #f5f5f5 surfaces | barba, **SplitType**, Swiper hero carousel, `clamp()` ×16, marquee, `cursor:none`, Lenis signal |
| Pace — pacegallery.com | custom | **Untitled Sans** (Klim) + LFT Etica | #737373/#959595 greys | **CSS `view-transition` ×3**, barba, filter-grid with "hover-lift", list/grid signal |
| White Cube — whitecube.com | Craft + Shopify | **Beausite Text / Detail / Display** (three optical cuts) | #f9f9f9 | **`clamp()` ×80** (fully fluid type), negative tracking ×21, `data-theme`, nav by city |
| Thaddaeus Ropac — ropac.net | **Artlogic CMS** | Formale Grotesque | white | `view-transition` ×4, `data-theme` ×6, 5 languages |
| Massimo De Carlo — massimodecarlo.com | **Nuxt** | **ABC ROM** (Dinamo) | `--color-black/--color-gray #a3a3a3/--color-accent` red #ff1b1b | Swiper ×454, scroll-snap ×21, barba, `cursor:none`, VSpace |
| Galleria Continua | Bootstrap 3 | Oswald + Continua Regular | white | barba ×15; IT/EN/FR/中文 |
| Pirelli HangarBicocca | WP WPML | Roboto + **OpenDyslexic** | electric blue #0048fe | **accessibility toolbar** (contrast, text size, dyslexia font, focus mode); Lenis, barba |
| Lisson | custom | Gill Sans WGL | red #f00 | grid ×22 |
| Perrotin — perrotin.com | Astro islands | **Akzidenz-Grotesk + Extended** + **JetBrains Mono** (metadata) | #8c8c8c, rules #e5e5e5 | uppercase ×261, **`@container` ×5**, `text-wrap:balance` ×16, barba, Lenis signal |
| Xavier Hufkens | Craft | **Messina Sans** (Luzi Type) + **Bell BQ** serif | #f7f8f5 | sticky ×8, Swiper, barba |
| Esther Schipper | Artlogic | Acumin Pro | #0c0c0c | **`data-theme="standard" / "reversed"`** inversion, filters overlay, wishlist |
| Sprüth Magers | WP | **Neue Haas Grotesk Text Pro** | red #ff1900 ×86 | `cursor:none` ×7, `clip-path` ×12, grayscale hover |
| Kukje | Bootstrap 5 | Helvetica Neue World | b/w | `clip-path` ×62, sticky ×13 |
| Gladstone — gladstonegallery.com | Gatsby | **Frame Head** (serif display) + **Basel Grotesk** | cool grey-green scale #647b7d/#b2c4c5/#dae2e2 | `--body-text: 22px`, `mix-blend-mode` |
| Mennour — mennour.com | Nuxt + UnoCSS | **Mennour Text** (custom serif) + **Mier B** (sans) | `--colors-red #ff6568` (display-p3), greys #e1e1e1/#a4a4a4/#f0f0f0/#404040 | `backdrop-filter` ×22, scroll-snap, barba, grayscale hover, `text-wrap:balance` |
| **Francis Gallery — francisgallery.com** | Sanity + Tailwind v4 | **Galerie Text** (serif) + **ROM Wide** (wide grotesk) | **`--color-offwhite #dcdbcf`, `--color-green #233028`, `--color-redbean #4e2b26`** | `clamp()` ×19, negative tracking, sticky; home = exhibitions list + "Featured artworks" cards; nav folded into Menu + Search |
| **Southern Guild — southernguild.com** | Nuxt + Sanity | **Neue Haas Grotesk Display Pro** 55/65 | #767676, rules #eaeaea, red #df1500 | **Lenis ×15**, `cursor:none` ×6, `mix-blend-mode` ×6, `--context 1440/375` fluid scale, exhibitions slider, enquiry basket |
| Lévy Gorvy Dayan | Next.js + Sanity | **Cormorant / Cormorant SC / Infant via next/font (Google Fonts)** | blue #1946ad | a blue-chip gallery on Google Fonts; lowercase, tight tracking |
| **LAS Art Foundation — las-art.foundation** | Next.js + Sanity + Tailwind | **OS Grotesk** (headline) + **ABC Diatype** (body) + **ABC Diatype Mono** (meta) | 12-step neutral scale `#fcfcfc → #202020` + acid **#5efd94 #06fff0 #deff17 #474ff0** | `clip-path` ×18, **`@keyframes marquee`**, scroll-snap, `prefers-color-scheme` |
| Huxley-Parlour — huxleyparlour.com | WP (Made By Six) | **Lausanne** 300/350/450 (light weights) | #606060, red #d61212 | **`data-theme` ×20** (theme switch), `cursor:none`, ScrollProgressBar component, SearchPanel, BurgerMenu |
| Schierke Seinecke | WP | **Basis Grotesque Bold + Reckless** | b/w #979797 | `clip-path` ×10, `cursor:none` |
| Galeria Foco | WP | **Lausanne 300 + Millionnaire** serif | #efefef | vw type 4.25vw, EN/PT |
| Kurimanzutto | custom | custom "kurimanzutto" | b/w | **`text-transform:lowercase` ×29 (all-lowercase site)**, EN/ESP, grayscale hover |
| Sadie Coles HQ | Craft | **Helvetica Now Text/Display/Micro** | `--background 223 234 227` pale green-grey / `--dark-background 31 52 40` | **`clamp()` ×337**, video tiles for exhibitions |
| Karma | WP | Akzidenz-Grotesk | b/w | 9vw type |
| Peres Projects | WP | Nimbus Sans/Akkurat | b/w | `cursor:none` |
| Andrew Kreps | custom | Helvetica Neue LT 35→85 | b/w | grayscale hover |
| Museum of Modern Art Warsaw — artmuseum.pl | Next.js | **MSN Qwerty** (serif) + **MSN Next** (sans), custom by Colophon | `--default-bg #000 / #fafafa`, cyan #0bf | **"Invert" button** (theme inversion), `@keyframes marquee` ×2, `backdrop-filter` ×44, `font-variation-settings` |
| Van Gogh Museum | custom | Gotham Rounded SSm | per-section colour system | `clamp()` ×43, `clip-path` ×34, Micrio deep zoom |
| **Snøhetta — snohetta.com** | custom | **Dovre** (Monokrom) | `--color-foreground #000 / --color-background #fff / --color-accent #42ff00`; dark variant `#1e1e1e` area, `#404040` stroke | dark/light + **"Simplified" and "Low-res" modes**, Lottie, scroll-snap, `text-wrap:balance` |

### 1.4 Trend-setting studios and 2026 award portfolios

| Site | Stack | Type | Tokens | Motion / features |
|---|---|---|---|---|
| Locomotive — locomotive.ca | custom | Helvetica Now Display + PP Locomotive New | `--color / --color-bg` flip #fff↔#000; red #da382e, blue #312dfb | `clamp()` ×88, `data-theme` ×21, `@container`, locomotive-scroll |
| darkroom.engineering (ex Studio Freight, makers of Lenis) | Next.js | Therma / Sauce / Mono (custom) | `lab()` colour tokens, red #e71419 | **Lenis, Hamo, Tempus, GSAP, three.js**, `view-transition` ×7, `data-theme` ×13, type 17–26vw |
| Lenis — lenis.dev | Next.js | Roboto + Anton (Google) + **Panchang (Fontshare)** | `--color-primary #efefef --color-secondary #000 --color-contrast #ff98a2` | `data-theme`, 16vw type; default `lerp: 0.08` |
| basement.studio | Next.js + Sanity + GSAP | **Geist + Geist Mono** + Flauta | orange #ff4d00 | negative tracking ×31, marquee, `color-scheme` |
| Obys — obys.agency | custom | one custom serif "Obys" | `--white #fff --black #000` only | `aspect-ratio` ×114 |
| Unseen Studio — unseen.co | WP | **Neue Montreal + Saol Display** | `--text #212121 / --hoverText #fff` inversion | nav **"Index / Projects / Contact"** |
| Vide Infra — videinfra.com | custom | Graphik LCG | b/w | barba ×3, `aspect-ratio` ×140, `cursor:none`, list/grid |
| Sharplink (Studio Freight, SOTD 27 Aug) | Nuxt + Storyblok | **Archivo + Archivo Narrow (Google)** | #f7f7f5/#fdfbf7 off-white, blue #0e76ff | negative tracking ×663, Lenis, Lottie, `text-wrap:balance` |
| Paul Kalkbrenner (HOLOGRAPHIK, SOTD 2 Sep) | Webflow + GSAP + barba + Lenis | **ABC Diatype Plus Variable** | `--color--dark #000 --color--light white --color--gray #c5c5c5 --color--green #a7ff9c --color--orange` | `data-theme` ×4, 10vw type |
| Jason Bergh — jasonbergh.com | Webflow + **GSAP ×447 + SplitType + barba ×11 + Lenis** | **Editorial New** (Pangram Pangram) + Monument Grotesk + Monument Grotesk Mono + ABC Simon Mono | warm `--light #fffbf2`, #ffeec8, ink #1e1e1c | numbered nav "01. Work 02. Reportage …", radio filters, marquee, 13vw type |
| Joffrey Spitzer — joffreyspitzer.com (Codrops, Feb 2026) | **Astro + Prismic + Swup + GSAP (SplitText, Flip, ScrollTrigger) + Lenis + Three.js + Tailwind** | PP Neue Montreal | b/w | **"Grid / List" toggle** (Flip), preloader counter, clip-path reveals — see timings in 2.5 |
| Thibault Guignand (Codrops, May 2026) | Vite + React + GSAP + OGL + Lenis | — | — | FR/EN i18n, Cmd+G grid overlay, clip-path wipes, **View Transition API** page transitions (0.6s), scroll-morph to next project |
| Kai Blamey — kaiblamey.com | Gatsby | ABC Schengen | b/w | `list-view`, `backdrop-filter` |
| Patrick Mason Studio | Gatsby + Tailwind | Work Sans variable | #1c1c1c/#f3f3f3 | scroll-snap |

### 1.5 Quantified vocabulary (91 sites, raw HTML + CSS grep)

| Signal | Count | Where it matters |
|---|---|---|
| `text-transform: uppercase` labels | 70/91 | metadata/nav in small caps-tracked grotesk is the default |
| `position: sticky` | 62/91 | sticky captions/headers |
| monospace in `font-family` | 58/91 | mono for metadata is mainstream (Perrotin, LAS, Vascellari, Bergh, mesh3d, basement, Merz) |
| newsletter | 52/91 | |
| `clip-path` | 49/91 | reveal masks |
| `aspect-ratio` boxes | 46/91 | no layout shift |
| filters UI | 41/91 | |
| lightbox/zoom | 41/91 | |
| **custom cursor (`cursor:none`)** | 39/91 | still very common, incl. Saraceno, Southern Guild, Sprüth Magers, Noguchi, Jago |
| reduced-motion query | 32/91 | |
| horizontal scroll / scroll-snap | 31/91 | |
| search | 30/91 | |
| `mix-blend-mode` | 29/91 | text over images, inverted cursors |
| `backdrop-filter` | 29/91 | frosted headers/menus |
| language switch | 28/91 | |
| **dark mode / `data-theme`** | 24/91 | Gagosian, White Cube, Ropac, Schipper, Huxley-Parlour, Locomotive, darkroom, Lenis, Snøhetta, MSN Warsaw, Noguchi, Pomodoro, Jago, Kalkbrenner |
| **Lenis / smooth scroll** | 24/91 | Sassolino, Southern Guild, Goodman, Zwirner, Pace, Perrotin, Hangar, Hepworth, Pomodoro, Jago, Bergh, Kalkbrenner, Sharplink, darkroom … |
| page transitions (barba / swup / View Transitions) | 23/91 | barba still the most common; **native `view-transition` at Pace, Ropac, darkroom** |
| lowercase headings | 21/91 | Kurimanzutto, Es Devlin, Gagosian, Zwirner, Rondinone |
| text splitting (SplitText/SplitType) | 19/91 | |
| variable-font `font-variation-settings` | 18/91 | |
| vw-based type | 18/91 | Saraceno 11vw, Not Vital 12vw, Arsham 12vw, Synchronized 20vw, darkroom 26vw |
| marquee | 14/91 | LAS, MSN Warsaw, Zwirner, basement, Arsham, Vascellari, Pivi |
| WebGL / three / OGL | 12/91 | portfolios and studios, almost never galleries |
| grayscale→colour hover | 12/91 | Jago, Goodman, Kurimanzutto, Mennour, Merz, Sprüth Magers |
| GSAP (unbundled) | 11/91 | undercount: bundled in many Next/Nuxt builds |
| **list ⇄ grid toggle** | ~12/91 | Pace, Kurimanzutto, Sugimoto, Vascellari, Sassolino, Gates, Locomotive, Vide Infra, Kai Blamey, Spitzer ("Grid List" button), Landberg ("Featured/Full"), Es Devlin (Grid/List/Spectrum/Timeline) |
| fluid `clamp()` type | 9/91 but extreme where used | White Cube ×80, Sadie Coles ×337, Locomotive ×88 |
| `text-wrap: balance` | 9/91 | Perrotin ×16, Sharplink ×21 |
| `@container` queries | 3/91 | Perrotin, Locomotive, mesh3d |
| **CSS scroll-driven animations (`animation-timeline`)** | 0/91 | nobody ships them yet — a free differentiator (progressive enhancement) |

Platform split: Next.js + Sanity is the modern gallery default (Es Devlin, Tillmans, Gagosian, Zwirner, Goodman, LAS, LGD, Francis, MSN Warsaw, darkroom, basement); Nuxt for Mennour, MDC, Southern Guild, Penone, Synchronized, Landberg; Artlogic CMS for Ropac and Schipper; WordPress still runs Saraceno, Anadol, Jago, Viale, Sassolino, Noguchi, Merz, Pomodoro; Cargo for Vascellari (and the "hover image preview on a text index" pattern is literally a Cargo feature: https://docs.cargo.site/thumbnail-index, https://support.cargo.site/Show-an-Image-on-Hover).

---

## 2. The 2025–2026 "ultra-modern" vocabulary for art sites

### 2.1 Typography
- **One grotesk carries everything**; Neue Haas Grotesk (Es Devlin, Southern Guild, Sprüth Magers, Vascellari), ABC Diatype (LAS, Vascellari, Kalkbrenner), Untitled Sans (Pace), Akzidenz (Perrotin, Karma), GT America (Gagosian), Helvetica Now (Sadie Coles, Locomotive), Söhne (Penone), Lausanne light weights (Huxley-Parlour, Foco). Free stand-ins: Inter Tight, Geist, Switzer, General Sans, Host Grotesk, Hanken Grotesk.
- **Grotesk + contemporary serif** is the gallery pairing of the moment: Söhne + Untitled Serif (Penone), Messina + Bell BQ (Hufkens), Basel Grotesk + Frame Head (Gladstone), Basis Grotesque + Reckless (Schierke Seinecke), Mier B + Mennour Text, ROM Wide + Galerie Text (Francis), Neue Montreal + Saol (Unseen), MSN Next + MSN Qwerty (Warsaw), Monument Grotesk + Editorial New (Bergh). Free: Instrument Serif, Fraunces, Newsreader, Sentient, Gambetta, Literata.
- **Monospace for metadata** (year · material · cm · place) in 58/91 sites: JetBrains Mono (Perrotin), ABC Diatype Mono (LAS), Monument Grotesk Mono (Vascellari, Bergh), Geist Mono (mesh3d, basement), Cutive Mono (Merz). Free: Geist Mono, JetBrains Mono, IBM Plex Mono, DM Mono, Martian Mono.
- **Huge display sizes in vw** (8–20vw) and **fluid `clamp()`** everywhere; **negative tracking** (-0.02 to -0.05em) on display; **variable fonts** with `font-variation-settings`; optical-size axes (Fraunces, Newsreader, Bricolage, Literata, Big Shoulders).
- **Case**: uppercase tracked micro-labels (70/91) *and* all-lowercase names/nav (Kurimanzutto, Es Devlin, Gagosian, Rondinone). Numbered nav "(01) … (04)" (Vasilyeva, Bergh). Arrows "→ / ↗" as the only icons (Tillmans, Anadol).
- **Single-typeface sites** (Tillmans in one variable serif; Obys in one serif) read as the most confident.

### 2.2 Colour
- Two poles: **near-black** (#08090D mesh3d, #0F0F0F Gatt, #121212 Anadol, #0c0c0c Schipper, Jago) vs **stark white/off-white** (#FFFFFF Kononenko, #f5f5f5 Zwirner, #f9f9f9 White Cube, #f7f7f4 Penone, #f7f8f5 Hufkens, #e6e4de Es Devlin grey, #dcdbcf Francis, #f3f2ed Hepworth, #fffbf2 Bergh).
- **Neutral scales as tokens** (LAS 12 steps #fcfcfc→#202020; Quintin `--white/--black/--gray/--ink`; Vasilyeva; Mennour greys) — colour comes from the artwork.
- **One accent, often acid or signal**: #42ff00 (Snøhetta), #5efd94 / #deff17 (LAS), #ecff3e (mesh3d), #a7ff9c (Kalkbrenner), #ff4d00 (basement), #e71419 (darkroom), #ff1900 (Sprüth Magers), #df1500 (Southern Guild), #ff6568 (Mennour, display-p3), #0048fe (Hangar), #3e00cf (Quintin), #312dfb (Locomotive). Note several fail AA as text on white (Mennour red 2.9:1, Snøhetta green 1.35:1) — they are used for rules, cursors, active states, not text.
- **Warm "gallery paper" palettes** still win in the Siteinspire/gallery tier: Francis (#dcdbcf + deep green #233028 + red-bean #4e2b26, both AAA), Gladstone's grey-green, Sadie Coles' pale green rgb(223 234 227) with dark green rgb(31 52 40).
- **Theme switching is now a feature**: `data-theme` standard/reversed (Schipper), "Invert" (Warsaw), dark/light + Simplified/Low-res (Snøhetta), per-page text-colour flips (Pivi), section theming (Gagosian ×162).
- `color(display-p3 …)` and `lab()` tokens are appearing (Mennour, darkroom).

### 2.3 Layout
- **Index-first**: the works list *is* the home (Kapoor, Tillmans, Es Devlin), or a dense typographic index with **hover image previews** (Cargo pattern; Unseen "Index"); **list ⇄ grid toggle** with FLIP animation (Spitzer, Pace, Kurimanzutto, Landberg "Featured/Full"); alternative sorts (Es Devlin **Spectrum / Timeline**).
- **Full-bleed, edge-to-edge media**, image grids with `aspect-ratio` boxes, 2–4 column "exhibition card" grids; **sticky caption column** beside scrolling images (62/91 sticky).
- **Split screens** (image | text), **overlapping type and image** (`mix-blend-mode: difference` for names over photos, 29/91).
- **Horizontal scroll / snap galleries** (31/91) for series; marquee tickers for exhibitions/news (LAS, Warsaw, Zwirner).
- **Pinned scroll sections** (GSAP ScrollTrigger pin; Codrops "Sticky Grid Scroll": 12 images, 3 columns, grid scales to 2.05×, 425vh scroll length, 60ms column stagger).
- Nav collapses to **3–5 items** (Es Devlin: Work · Information · Search; Penone: Works · Drawings · Editions · Words · News · About; Unseen: Index · Projects · Contact) or hides behind "Menu" *plus* a visible Search (Francis).
- **Bento/asymmetric grids**, deliberate "intentional imperfection" (trend articles), design-grid overlays as an Easter egg (Quintin, Guignand Cmd+G).

### 2.4 Motion
- **Lenis smooth scroll** (`lerp` 0.08–0.1) synced to GSAP ticker is the standard base layer (24/91; "nearly every Awwwards-winning Next.js site lists Lenis").
- **Scroll-driven**: parallax at 5–10% on images (per-image speed multipliers 0.8–1.3 in the Codrops infinite gallery), **pinning**, scrub timelines (`scrub: 1`), scroll-morph into next work (background scale 1.3→1.0 + inset clip-path).
- **Text splitting reveals** (SplitText/SplitType, 19/91): lines masked and translated `yPercent: 105`, 0.9s, `expo.out`; chars `yPercent:-120, scale:1.2`, 1s.
- **Image reveal masks**: `clip-path: inset()` wipes (49/91), SVG grid/blind masks on scroll (Codrops Mar 2026), block-noise WebGL dissolves (Guignand).
- **FLIP transitions**: menu link → page title (0.9s `expo.inOut`), thumbnail → full image (open 1.2s `power4.inOut`, close 1s), grid ⇄ list re-layout (1s `expo.inOut`).
- **Page transitions**: barba.js still most common; **native View Transitions API** shipping at Pace, Ropac, darkroom, Guignand (cross-fade + shared-element morph).
- **Hover**: image preview follows cursor with lag; grayscale→colour (12/91); "hover-lift" cards (Pace); underline draw; magnetic buttons; **custom cursor** with label (39/91).
- **Marquee** tickers (14/91), **preloaders** with counters (Goodman, Spitzer — increasingly criticised as "mandatory loaders").
- **WebGL**: fluid/flowmap distortion on hero images, particle "oil slick" hover (mesh3d) — portfolio territory, rare on gallery sites.
- **CSS scroll-driven animations** (`animation-timeline: view()`): recommended in 2026 trend pieces, 0/91 in the wild — cheap, JS-free reveals.
- Honour `prefers-reduced-motion` (32/91 do).

### 2.5 Reference motion spec (from Codrops build write-ups, Feb–Jul 2026)

| Element | Values | Source |
|---|---|---|
| Smooth scroll | Lenis `lerp: 0.08`, synced to `gsap.ticker` | Sticky Grid Scroll (Mar 2026) |
| Title reveal | SplitText chars, `yPercent:-120, scale:1.2`, 1.0s, `expo.out` | Spitzer (Feb 2026) |
| Paragraph reveal | lines, `yPercent:105`, 0.9s, mask | Spitzer |
| Image fade-up | `autoAlpha 0→1`, 0.8s, `power3.out` | Spitzer |
| Grid⇄List | `Flip.getState()` → class swap → `Flip.from()` 1.0s `expo.inOut` | Spitzer |
| Thumb→detail | `Flip.from()` 1.2s `power4.inOut`; close `Flip.fit()` 1.0s; text stagger 0.01s/char, 0.06s/line | Infinite GSAP Scroll Gallery (Jul 2026) |
| Pinned grid | 425vh, columns reveal with 60ms stagger, scale to 2.05×, sides ±40%, `power1–3.inOut`; title 0.7s, text 0.4s | Sticky Grid Scroll |
| Page transition | 0.6s parallel fade (WebGL, grid, cursor) + View Transition API | Guignand (May 2026) |
| Preloader | counter 0→100 `steps(14)` 3s, then clip-path reveal top→bottom | Spitzer |

GSAP note: since v3.13 (April 2025) GSAP and all plugins (SplitText, Flip, ScrollTrigger, ScrollSmoother) are free for commercial use.

### 2.6 Functions now expected
Works index sortable/filterable (41/91 filters) by material / year / type / place; **list ⇄ grid** toggle; alternative views (timeline, "spectrum" by colour); **lightbox with zoom** (PhotoSwipe; Van Gogh uses Micrio deep zoom); keyboard navigation; **search** (30/91); **language switch** (28/91); **dark mode toggle** (24/91); **related works**; **map of public works** (Plensa "Map of Works 🌍", Randall-Page "Sculpture Map", Noguchi "Public Works"); **timeline/chronology** (Es Devlin, Goodman 60th-anniversary timeline, Blumenfeld, Noguchi); catalogue raisonné (Noguchi); enquiry basket (Southern Guild, Goodman); newsletter (52/91); accessibility modes (HangarBicocca toolbar; Snøhetta "Simplified" / "Low-res"); print-friendly texts.

### 2.7 What now reads as dated (with evidence)
- **Full-screen hero carousels/sliders** — "less than 1% of visitors clicked past the first slide" (madebydave.org); still used by Plensa (owl-carousel), Zwirner, MDC, Continua, Southern Guild, Ropac — none of the 2026 award winners use one.
- **Parallax hero video / heavy parallax** (Theaster Gates' jarallax) — "excessive parallax … obsolete"; subtle 5–10% image parallax is fine.
- **Desktop hamburger-only nav** — "importing a mobile solution to a 1,920-pixel screen"; acceptable only when paired with a visible Search or ≤3 items (Francis).
- **Mandatory preloaders** and "click to enter"; autoplay video with sound; pop-ups; cookie walls.
- **Bootstrap-3 grids, Font Awesome icon fonts, Open Sans/Roboto Slab/Proxima Nova/Montserrat/Lato** (Plensa, Continua, Pomodoro, Arsham/Sugimoto on Squarespace) — "signals dated 2010s design"; Inter alone now "generic if not styled thoughtfully".
- **Skeuomorphic textures, drop shadows, flat-design icon sets, generic AI stock imagery, template sameness** ("identical three-column hero-feature-testimonial").
- **Justified/masonry-everything galleries with heavy lightbox chrome**; Fancybox-style UI.
- **Decorative animation without purpose** ("effects that looked good for five seconds") — 2026 pieces stress restraint, speed as premium, purposeful minimalism.
- Overexposed: Playfair Display; pure glassmorphism everywhere (now "refined, selective").

Sources: https://elements.envato.com/learn/web-design-trends · https://www.topcssgallery.com/blog/web-design-trends-dominating-award-galleries/ · https://madebydave.org/blog/web-design-trends-2026 · https://www.wazile.com/blog/outdated-web-design-trends-to-avoid-in-2026/ · https://spoko.space/blog/modern-website-design-trends/ · https://nakadadesign.com/stories/25-best-art-gallery-websites-2026 ("Work first. Restraint and generous space that let the art lead") · Codrops: https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/ · https://tympanus.net/codrops/2026/05/06/from-shader-uniforms-to-clip-path-wipes-how-gsap-drives-my-portfolio/ · https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/ · https://tympanus.net/codrops/2026/07/30/building-an-infinite-gsap-scroll-gallery-with-parallax-and-flip-transitions/ · https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/

---

## 3. Proposed directions

Constraints kept in mind: Next.js static export on GitHub Pages (no server; client components for Lenis/GSAP are fine; search via Pagefind; View Transitions via `next-view-transitions` or the native `@view-transition` rule); Keystatic editors in the family; IT default with EN fallback; ~100 paintings arriving; content photographed mostly outdoors (white stone against grass, sky, mountain, wood) with some studio/black-slate shots; the artist is 75 (body text ≥ 18px, contrast ≥ AA everywhere, no reliance on hover). WCAG ratios below were computed (relative-luminance formula).

### Design B — "completely different, ultra-modern"

#### B1 · **Nero Ardesia** (dark, mono metadata, acid accent, index-first)
The "most different from A" option: near-black UI, one grotesk + one mono, no serif, acid accent, typographic index with hover previews.

- **References**: LAS Art Foundation https://www.las-art.foundation/ (neutral scale, mono metadata, marquee, acid accents); mesh3d https://mesh3d.gallery/the-state-of-the-gallery (#08090D, Geist + Geist Mono); Michael Gatt (#0F0F0F/#CFCFCF, scroll storytelling); Jago https://jago.art/en/ (dark bg specifically for white marble; grayscale→colour hover; GSAP ScrollTrigger); Southern Guild https://southernguild.com/ (Lenis + custom cursor + NHG Display); Snøhetta https://www.snohetta.com/ (acid #42ff00 accent, "Simplified"/"Low-res" modes).
- **Palette** (roles → hex, contrast on bg): background `#0E0E0E`; surface `#161616`; hairline `#2A2A2A` (non-text); text `#F2F0EA` (16.9:1 AAA); secondary `#A3A39C` (7.6:1 AAA); metadata `#7A7A73` (4.5:1 — use ≥18px, or lift to `#8A8A83`); accent acid lime `#D4FF3F` (16.7:1 as text; black on lime buttons 16.7:1). Alt accent signal orange `#FF5A1F` (6.2:1 AA). Images sit on `#161616` cards with 1px `#2A2A2A` keylines so outdoor photos don't "float".
- **Type**: display + UI **Geist** 100–900 (Google) or **Switzer** (Fontshare, 100–900 + italics); metadata **Geist Mono** or **JetBrains Mono** 12–13px uppercase +0.08em; name set lowercase at `clamp(3rem, 12vw, 14rem)`, tracking −0.04em; body 18–20px Geist 400, line-height 1.5. No serif anywhere (that is the point).
- **Home**: full-bleed single photograph (slate or studio shot), name in 12vw lowercase over it with `mix-blend-mode: difference`; a one-line marquee of current exhibitions; then the works index begins immediately (no "welcome" copy).
- **Works index**: typographic table — n° · title · year · material (Majella / Carrara / ardesia) · cm · place — each row lights its photo at the cursor (Cargo pattern) with 60–80ms lag; **grid toggle** via GSAP Flip; filter chips (material, decade, type: seed / sprout / tuber / painting); count "84 opere"; keyboard j/k; touch devices get thumbnails inline.
- **Work detail**: image column 2/3 edge-to-edge, sticky mono caption column 1/3; images reveal with `clip-path: inset(100% 0 0 0 → 0)` 0.9s `expo.out`; "related by material" strip; prev/next with shared-element View Transition of the image.
- **Texts (Scritti)**: mono index (year · author · title) → reading column 20–21px `#F2F0EA` on `#0E0E0E`, max 66ch; reading progress hairline.
- **Motion**: Lenis `lerp 0.08`; SplitText line reveals on h1/h2 only; image masks; Flip grid⇄list; View Transitions cross-fade 0.35s; grayscale→colour on hover of grid thumbs (Jago/Goodman pattern); optional custom cursor "vedi ↗"; marquee 40s linear; all gated by `prefers-reduced-motion`.
- **Functions**: filters/sort/search (Pagefind), list⇄grid, lightbox zoom (PhotoSwipe), keyboard nav, IT/EN, related works, map of public works (MapLibre static or SVG Abruzzo), timeline, newsletter; **light-mode toggle is out of scope by design** (else it becomes C2).
- **Risks for this artist**: outdoor photos (green grass, blue sky) against near-black read as "TV in a dark room" — needs consistent photo editing (lift shadows, neutral WB) and generous surface padding; critics/galleries associate dark UI with tech/music, less with a stone sculptor of seeds; acid lime can read "crypto"; a 75-year-old reads dark text less comfortably (keep 18–20px, AAA); family editors won't see motion regressions. Dark is perfect for the **black slate** works and studio shots.
- **Fit for white marble photographed in nature**: **medium**. Best for slate and studio; weakest of the three for grass/sky photos.

#### B2 · **Bianco Assoluto** (stark white, ink, electric accent, the index is the site)
The cleanest 2026 Swiss reading: white, black, one electric accent, tight grotesk, mono metadata, no hero — the works table is the home page.

- **References**: Kurimanzutto https://www.kurimanzutto.com/ (all-lowercase typography); Tillmans https://www.tillmans.co.uk/ (text index, arrows, one variable face); Es Devlin https://esdevlin.com/work (Grid / List / Spectrum / Timeline views); Pace https://www.pacegallery.com/ (View Transitions + filter grid + hover-lift); Perrotin https://www.perrotin.com/en (Akzidenz + JetBrains Mono metadata, `@container`); Unseen https://unseen.co/ ("Index · Projects · Contact"); Quintin Lodge (tokens #F2F2F2/#010101 + #3E00CF accent); Sharplink (Archivo tight tracking on off-white); Kononenko SOTD (#FFFFFF/#000000 only).
- **Palette**: bg `#FFFFFF`; ink `#0A0A0A` (19.8:1); secondary `#6B6B6B` (5.3:1 AA); tertiary `#8A8A8A` (3.5:1 — ≥18px only); rules `#E6E6E6`; surface `#F2F2F2` (ink on it 17.7:1); accent electric blue `#1F3BFF` (6.7:1 AA as text; white on it 6.7:1) used only for links, active filter, focus ring, cursor dot. Alternative accent red-orange `#E8431A` fails AA as text (4.0:1) — use only as a non-text mark.
- **Type**: **Inter Tight** 100–900 (display at −0.04em, lowercase) + **Instrument Sans** (wdth 75–100, condensed for labels/nav) + **Geist Mono** metadata; or Fontshare **Cabinet Grotesk** (display) + **Switzer** (text) + **JetBrains Mono**. Body 18–19px.
- **Home = index**: header row "Pasquale Liberatore — scultore, Majella" in 4vw, right-aligned Search · IT/EN; then the full table of works (title · year · material · cm · place) with cursor-following preview; a **"spettro" sort** (by material or by dominant colour computed at build time from `content/media` — the 100 paintings finally get a colour-sorted strip); **timeline** sort by decade; grid toggle.
- **Work detail**: image 66% edge-to-edge left, sticky caption right; hairline-only chrome; next/prev as text arrows "←  →"; lightbox zoom.
- **Texts**: index (year · title · author) + 66ch reading column in Inter Tight 400 19px / 1.55; optional Newsreader for long essays if the client misses a serif (kept out by default).
- **Motion**: native scroll (no Lenis — "instant" is the mood); **View Transitions** (cross-fade 0.3s + shared-element morph list thumb → detail image); hover preview with lerp; row underline draws 0.25s; SplitText only on the name once; grid⇄list Flip 0.8s `expo.inOut`; cursor turns into "+" over images; zero parallax.
- **Functions**: filters, three sorts (year / material / colour), list⇄grid, search, keyboard, lightbox, IT/EN, related works, map, timeline, newsletter, print stylesheet for critics, no dark mode.
- **Risks**: can feel cold/corporate for a sculptor of seeds and tubers — warmth must come entirely from photography; hover previews are meaningless on touch (fallback = thumbnails); an index-first home assumes strong, consistently edited photos; white on white needs 1px keylines or `#F2F2F2` mats behind photos with white backgrounds; least "wow" for a client asking for animation.
- **Fit for white marble in nature**: **high** — the photographs keep their own light and colour; white UI never fights sky or stone.

#### B3 · **Ardesia e Majella** (two stones as UI: slate ↔ Majella off-white, cinematic scroll, image-led)
The most distinctive concept: the palette *is* the materials. Light "Majella" sections for the white stone, dark "ardesia" sections for slate and night; theme swaps on scroll; pinned image sequences.

- **References**: Esther Schipper `data-theme="standard|reversed"` https://www.estherschipper.com/; MSN Warsaw "Invert" + marquee https://artmuseum.pl/en; Paola Pivi per-page colour flips; Snøhetta dark/light tokens; Codrops Sticky Grid Scroll; Jason Bergh https://www.jasonbergh.com/ (Editorial New + Monument Grotesk Mono on warm `#fffbf2`, numbered nav, filters); Huxley-Parlour (Lausanne light + theme + scroll progress); Michael Gatt (scroll storytelling).
- **Palette**: light half — bg `#EDEAE3` (Majella), ink `#1B1D1F` (14.1:1); dark half — bg `#1B1D1F` (slate), text `#EDEAE3` (14.1:1), surface `#24272A` (12.5:1 with text), secondary `#A7A9A6` (7.1:1 on slate), metadata `#7D807C` (4.2:1 — large only); accent warm stone-gold `#C9A57A` (7.4:1 on slate; slate on gold 7.4:1) taken from lichen/ochre in the photographs — or no accent at all (accent = photo). Both halves AAA for primary text.
- **Type**: display **Fraunces** variable (opsz 144, SOFT 100, WONK 0 → soft, sculptural, no wonk) or **Newsreader** kept as the bridge to A; UI **Geist** or **Instrument Sans**; metadata **Geist Mono**. Fontshare alternative: **Sentient** or **Gambetta** + **General Sans** + **JetBrains Mono**.
- **Home** (cinematic): 100vh photograph, name at 12vw serif with `mix-blend-mode: difference`; pinned **sticky-grid** of 12 works that opens and scales as you scroll (425vh); a "Materiali" section where the page **cross-fades from Majella to ardesia** as slate works enter the viewport (section-level `data-theme` on IntersectionObserver, 0.5s); exhibitions marquee; texts teaser; footer in slate.
- **Works index**: grid default with material chips (bianco Majella · Carrara · ardesia · pittura) and year; list toggle (Flip); slate works render dark cards, Majella works light cards, so the grid itself becomes a two-tone mosaic.
- **Work detail**: full-bleed image; sticky caption; theme follows material (ardesia → dark); "opere affini" by material; reading progress hairline.
- **Texts**: light theme by default (long reading), serif 20–21px, 66ch, mono marginalia (year, publication).
- **Motion**: Lenis + ScrollTrigger pinning (home only), theme cross-fade, 5–8% image parallax, SplitText on titles, `clip-path` reveals, Flip to detail, magnetic buttons on the two CTAs, custom cursor with "vedi"; reduced-motion disables pinning and parallax (falls back to C1 behaviour).
- **Functions**: everything in B1 plus **theme toggle** (persisted) and "auto by material".
- **Risks**: heaviest build and QA (every image must work on both grounds; two themes × two languages); pinned/scroll-jacked sections irritate critics who want the index in two clicks — put "Opere" one click from everywhere; theme swap on scroll can flicker on iOS Safari (use `transition: background-color .5s` on `<html>` and avoid swapping inside pinned sections); mobile pinning is fragile; the dark half has B1's outdoor-photo problem (mitigated: outdoor photos live in the light half by rule).
- **Fit for white marble in nature**: **high on the light half, medium on the dark half** — but it is the only direction whose *concept* is the materials themselves.

**Which B for white stone photographed outdoors**: **B2 Bianco Assoluto** flatters the photography most; **B3 Ardesia e Majella** is the strongest idea and still keeps outdoor work on a light ground; **B1 Nero Ardesia** is the boldest "completely different" but the riskiest for grass-and-sky photographs (great for slate). Recommended B to present: **B3**, with B1 as the "if you really want dark" variant and B2 as the lean/fast-to-build variant.

### Design C — halfway between the editorial site (A) and the ultra-modern one

#### C1 · **Pietra e Grafite** (keep the paper, change the grammar: index, grotesk display, mono metadata, real transitions)
Keeps A's bone paper and Newsreader for reading, but replaces the masonry-and-fade-in grammar with the 2026 gallery grammar: typographic index with hover previews, list⇄grid, sticky captions, wide grotesk display, mono metadata, view transitions, clip-path reveals.

- **References**: Francis Gallery https://francisgallery.com/ (`#dcdbcf` off-white + deep green `#233028` + red-bean `#4e2b26`, serif text + wide grotesk display, `clamp()` type, exhibitions as a dated list); Xavier Hufkens https://www.xavierhufkens.com/ (Messina Sans + Bell BQ on `#f7f8f5`, sticky ×8); Gladstone https://gladstonegallery.com/ (Frame Head + Basel Grotesk, 22px body, cool grey-green scale); Penone https://giuseppepenone.com/en (Söhne + Untitled Serif on `#f7f7f4`; nav Works · Drawings · Editions · Words); Sadie Coles (fully fluid `clamp()`).
- **Palette**: paper `#F4F2EC` (keep A); surface `#ECE9E1`; hairline `#D9D5CB`; graphite ink `#161616` (16.2:1); secondary `#5C5A55` (6.2:1 AA); tertiary `#8A877F` (3.2:1 — ≥18px labels only); accent **ardesia blue-grey `#3E4A52`** (8.1:1 AAA) for links/active states, replacing olive; optional warm **terra `#A4502A`** (5.0:1 AA) for hover/focus. If the client wants continuity, olive `#4F5B3A` still passes (6.5:1).
- **Type**: reading **Newsreader** (opsz 6–72, keep — it is the bridge to A); display **Bricolage Grotesque** (opsz 12–96, wdth 75–100, 200–800) for the name, section titles and nav — characterful, wide, clearly 2026; metadata **IBM Plex Mono** or **Geist Mono** 12–13px uppercase +0.06em. Fontshare alternative: **Gambetta** + **General Sans** + **JetBrains Mono**. Body 19–20px Newsreader / 1.55; captions 15px.
- **Home**: one full-bleed photograph with the name in Bricolage at 8–10vw; a short editorial paragraph (A's voice); **"Ultime opere" as a typographic list** (8 rows with hover previews) instead of a masonry grid; exhibitions list with dates (Francis pattern); texts teaser.
- **Works index**: **list ⇄ grid** toggle (Flip), filter chips (material · type · decade), sticky header with count; list rows: title · year · material · cm · place; grid: `aspect-ratio` cards, caption below (never overlaid).
- **Work detail**: 2 columns — images scroll left, caption sticky right (title, year, material, dimensions, place, related texts); "opere affini per materiale"; lightbox zoom; prev/next.
- **Texts**: two-level index (year · title · author · publication) → 66ch Newsreader column 20px with mono marginalia; reading progress hairline; print stylesheet.
- **Paintings**: same index, plus a colour-sorted grid (dominant colour at build) — the one "spectrum" trick that makes 100 paintings browsable.
- **Motion** (calm): native scroll or Lenis `lerp 0.1`; **replace fade-ins with clip-path reveals from the bottom** (0.8s `expo.out`, 60ms stagger); SplitText on h1 only; hover image previews on list rows (desktop only); **View Transitions** cross-fade 0.3s + shared-element image morph list→detail; Flip on the toggle; no custom cursor, no marquee, no parallax.
- **Functions**: filters/sort/search (Pagefind), list⇄grid, lightbox, keyboard nav, IT/EN, related works, **map of public works** (SVG/MapLibre), **timeline/chronology**, newsletter, print; dark mode only as `prefers-color-scheme` for the reading pages (optional).
- **Risks**: the smallest visible departure — the wide grotesk display and the index are what must sell it as "new"; hover previews need the touch fallback; Bricolage's personality can tip into "friendly startup" if used bold — keep it 300–500 and wide; the 75-year-old will like this one most.
- **Fit for white marble in nature**: **high** — warm paper flatters Majella stone; hairlines echo carving lines.

#### C2 · **Due Pietre** (grotesk-led, dual theme with toggle: Majella light default, ardesia dark; serif only for essays)
A B3-lite: a sober grotesk UI on warm off-white by default, a real dark theme (toggle + optional auto-dark for slate works), cinematic details without pinning.

- **References**: Snøhetta (dark/light + Simplified mode), Huxley-Parlour (`data-theme` ×20, Lausanne light weights, scroll progress), Esther Schipper (standard/reversed), Locomotive (`--color/--color-bg` flip), MSN Warsaw ("Invert", MSN Qwerty + MSN Next), Lenis site (theme tokens).
- **Palette** — light: bg `#F5F3EE`, ink `#141414` (16.6:1), secondary `#5F5D58` (5.9:1), accent moss `#3F5A3C` (6.9:1) or rust `#9C4A2A` (5.5:1); dark: bg `#17191B`, text `#ECE8DF` (14.4:1), secondary `#A9A69F` (7.3:1), accent sage `#A6C49A` (9.2:1) or warm `#D9A066` (7.7:1). Tokens: `--bg --surface --ink --ink-2 --rule --accent` swapped by `[data-theme]`.
- **Type**: **Hanken Grotesk** 100–900 (warm humanist grotesk, "quietly replacing Lato/Open Sans") or **Geist** for UI + display (name at 9vw, −0.03em); **Newsreader** or **Fraunces** for essays only; **Geist Mono** metadata. Fontshare alternative: **Satoshi** + **Sentient** + **JetBrains Mono**.
- **Home**: full-bleed image + name 9vw; exhibitions marquee (slow, pausable); "index teaser" list; materials section with three big tiles (Majella · Carrara · ardesia) — the ardesia tile is itself dark.
- **Works**: grid/list with filters; slate works open in the dark theme automatically (opt-in setting, default off), everything else in light.
- **Detail**: full-bleed image, sticky caption, related works; **Texts**: light theme, 20px serif, progress bar.
- **Motion**: Lenis `lerp 0.1`; theme cross-fade 0.4s; SplitText on titles; clip-path reveals; Flip grid⇄list; View Transitions; no pinning, no custom cursor.
- **Functions**: theme toggle (persisted, respects `prefers-color-scheme`), list⇄grid, filters, search, keyboard, lightbox, IT/EN, related, map, timeline, newsletter.
- **Risks**: two themes double the editorial QA (every photo on both grounds); toggles are ignored by most visitors — default light; "auto-dark for slate" is charming but can feel like a glitch to a 75-year-old — ship it off by default; sage/moss on dark can drift toward "wellness brand" — keep accent usage to rules and active states.
- **Fit for white marble in nature**: **high in light theme**; the dark theme is where the slate pieces finally look right.

**Which C**: **C1 Pietra e Grafite** is the coherent, low-risk evolution and the one most likely to be approved by all three audiences (critics, galleries, the artist). C2 is the answer if the client wants "a dark option" without committing to B1/B3.

### Contrast audit (computed)

| Pair | Ratio | WCAG |
|---|---|---|
| B1 `#F2F0EA` on `#0E0E0E` | 16.94 | AAA |
| B1 `#A3A39C` on `#0E0E0E` | 7.61 | AAA |
| B1 `#7A7A73` on `#0E0E0E` | 4.47 | AA large only |
| B1 `#D4FF3F` on `#0E0E0E` / `#0E0E0E` on `#D4FF3F` | 16.71 | AAA |
| B1 alt `#FF5A1F` on `#0E0E0E` | 6.19 | AA |
| B2 `#0A0A0A` on `#FFFFFF` | 19.80 | AAA |
| B2 `#6B6B6B` on `#FFFFFF` | 5.33 | AA |
| B2 `#8A8A8A` on `#FFFFFF` | 3.45 | AA large only |
| B2 `#1F3BFF` on `#FFFFFF` (and inverse) | 6.71 | AA |
| B2 alt `#E8431A` on `#FFFFFF` | 4.00 | fails AA for text |
| B3 `#EDEAE3` on `#1B1D1F` (and inverse) | 14.07 | AAA |
| B3 `#A7A9A6` on `#1B1D1F` | 7.14 | AAA |
| B3 `#C9A57A` on `#1B1D1F` (and inverse) | 7.36 | AAA |
| C1 `#161616` on `#F4F2EC` | 16.16 | AAA |
| C1 `#5C5A55` on `#F4F2EC` | 6.15 | AA |
| C1 `#3E4A52` on `#F4F2EC` | 8.13 | AAA |
| C1 `#A4502A` on `#F4F2EC` | 4.99 | AA |
| C1 olive `#4F5B3A` on `#F4F2EC` | 6.49 | AA |
| C2 light `#141414` on `#F5F3EE` | 16.61 | AAA |
| C2 light `#3F5A3C` / `#9C4A2A` on `#F5F3EE` | 6.91 / 5.53 | AA |
| C2 dark `#ECE8DF` on `#17191B` | 14.42 | AAA |
| C2 dark `#A6C49A` / `#D9A066` on `#17191B` | 9.22 / 7.70 | AAA |
| ref Francis `#233028` / `#4E2B26` on `#DCDBCF` | 9.89 / 8.88 | AAA |
| ref Snøhetta `#42FF00` on white | 1.35 | non-text only |
| ref Mennour `#FF6568` on white | 2.87 | non-text only |

### Implementation notes for this repo (static export)
- Lenis + GSAP (ScrollTrigger, SplitText, Flip — all free since GSAP 3.13) run in client components; wrap in `useEffect`, kill on route change, honour `prefers-reduced-motion`.
- Page transitions: `next-view-transitions` (App Router) or native `@view-transition { navigation: auto }` on the exported MPA; shared-element morph via `view-transition-name` on the work image.
- Search: Pagefind post-build over `out/`; filters/sorts from the works front-matter at build time; dominant colour per image computed in `scripts/immagini.mjs` (sharp `stats()`).
- Hover previews: render the thumbnail `<Foto>` in the row, positioned `fixed`, moved with `requestAnimationFrame` lerp; hide on `(hover: none)`.
- Theme tokens on `<html data-theme>`; `color-scheme` set; persist in `localStorage`; default light.
- Consider `animation-timeline: view()` for reveals (0/91 sites use it; Chrome/Edge 115+, Safari 26+, Firefox recent) with the GSAP path as the tested baseline.

---

## 4. Eight free font pairings that feel 2026 (availability verified)

All axes/weights below were checked against Google Fonts metadata (fonts.google.com/metadata/fonts) and the Fontshare API on 2026-09-08. Fontshare (Indian Type Foundry) fonts are free for commercial use and self-hostable under the ITF Free Font License; Google Fonts are OFL. Self-host everything (browser cache partitioning removed the CDN advantage).

| # | Display | Text | Metadata mono | Mood | Free stand-in for | Watch-outs |
|---|---|---|---|---|---|---|
| 1 | **Instrument Serif** (Google; 400 + italic only) | **Inter Tight** (100–900, 18 styles) | **Geist Mono** (100–900) | sharp editorial-fashion, "Editorial New / Tiempos Headline" energy at 8–12vw | Editorial New, Canela, Tiempos | Instrument Serif has one weight → display only, never body |
| 2 | **Fraunces** (SOFT 0–100, WONK 0–1, opsz 9–144, wght 100–900) | **Hanken Grotesk** (100–900) | **JetBrains Mono** (100–800) | soft, organic, warm — literally "seeds and tubers"; the most technically advanced serif on Google Fonts | GT Alpina, Reckless, Canela | set WONK 0 and SOFT 50–100 or it turns twee; Hanken is "quietly replacing Lato/Open Sans" |
| 3 | **Bricolage Grotesque** (opsz 12–96, wdth 75–100, 200–800, no italics) | **Newsreader** (opsz 6–72, 200–800) | **IBM Plex Mono** (static 100–700) | bookish but 2026; characterful wide grotesk over a reading serif — the natural C1 pairing and the continuity path from A | ROM Wide / Basel Grotesk + Galerie Text (Francis Gallery) | Bricolage bold gets "friendly startup"; keep 300–500 |
| 4 | **Geist** (100–900) | Geist | **Geist Mono** | the Vercel/basement/mesh3d default: precise, neutral, slightly technical; one family for everything | Neue Haas Grotesk, Söhne, ABC Diatype | reads "developer tool" unless paired with a serif for essays |
| 5 | **General Sans** (Fontshare; 200–700 + italics, variable) | **Sentient** (Fontshare; 200–700 + italics, variable serif) | JetBrains Mono | gallery-grade Swiss warmth — the closest free approximation of Söhne/Diatype + Tiempos/Untitled Serif (Penone, Gagosian, LAS) | Söhne, ABC Diatype, GT America; Tiempos, Untitled Serif | Fontshare hosting is fine but download and self-host; no opsz axis |
| 6 | **Cabinet Grotesk** (Fontshare; 100–900 variable, no italics) | **Switzer** (Fontshare; 100–900 + italics variable) | **Space Mono** (400/700) or **DM Mono** (300–500) | art-world Swiss with a quirk in the display face — Basel Grotesk / Monument Grotesk territory over a Suisse Int'l-like text face | Basel Grotesk, Monument Grotesk; Suisse Int'l | Cabinet has no italics; Space Mono is quirky — use DM Mono if you want it invisible |
| 7 | **Gambetta** (Fontshare; 300–700 + italics variable, calligraphic serif) | **Satoshi** (Fontshare; 300–900 + italics variable) | DM Mono | warmer "studio in the mountains": friendly geometric + a serif with pen rhythm | Reckless, Editorial Old; Neue Montreal | Satoshi is the #1 Fontshare font (108k views) → template feel; use it only at 400/500 |
| 8 | **Clash Display** (Fontshare; 200–700 variable) | **Onest** (Google; 100–900, no italics) or **Author** (Fontshare; 200–700 + italics) | JetBrains Mono | poster-like, youthful, bold — the "Neue Machina / Druk-adjacent" look of 2025–26 portfolios | Neue Machina, PP Right Grotesk | too streetwear for a 75-year-old sculptor unless used at 300 and small |

Bonus faces worth knowing: **Overused Grotesk** (free, Randomtype; used by mesh3d) as a Neue Haas Grotesk alternative; **Host Grotesk** (Google, 300–800, added Nov 2024) and **Schibsted Grotesk** (400–900) as GT America / Helvetica Now stand-ins; **Archivo** (wdth 62–125, wght 100–900 — Sharplink SOTD) for a GT America Extended/Compressed system in one file; **Big Shoulders** (Google, opsz 10–72, 100–900, added Feb 2025) for condensed Italian-poster display; **Literata** / **Source Serif 4** (both with opsz) as Galerie Text / Untitled Serif alternatives; **Martian Mono** (wdth 75–112.5) as Monument Grotesk Mono; **Funnel Display + Funnel Sans** (Google, Nov 2024) as a "contemporary pair with strong momentum in 2025–2026"; **Zodiak** and **Boska** (Fontshare) for high-contrast display serifs; **Instrument Sans** (wdth 75–100) when a condensed UI face is needed. Not on Google Fonts: Commit Mono (free at commitmono.com). Declining: Proxima Nova, Open Sans, Raleway, Montserrat, Roboto, Playfair Display; Inter alone "can feel generic".

Sources: https://madegooddesigns.com/best-google-fonts/ · https://madegooddesigns.com/best-new-google-fonts-2026/ · https://madegooddesigns.com/popular-fonts/ · https://diversekit.com/blog/26-best-free-fonts-for-ui-web-design-in-2026 · https://pimpmytype.com/inter-pairings/ · https://www.fontshare.com/ · fonts.google.com/metadata/fonts

---

## Summary — strongest findings and recommendation

1. The 2026 art-site grammar is typographic, not decorative: one grotesk (or grotesk + contemporary serif), mono metadata (58/91 sites), uppercase micro-labels (70/91), huge fluid lowercase names, hairlines instead of boxes.
2. Colour comes from the artwork: near-black (#08090D–#121212) or off-white (#F5F5F5–#DCDBCF) with a single accent; warm-paper palettes (Francis, Gladstone, Sadie Coles) still win in the gallery tier.
3. The index is the product: works as a filterable list with cursor-following previews, list⇄grid toggle animated with FLIP, alternative sorts (Es Devlin's Spectrum/Timeline), sticky captions, related-by-material.
4. Motion baseline = Lenis (lerp 0.08) + GSAP ScrollTrigger/SplitText/Flip (all free since 2025) + clip-path reveals + View Transitions; custom cursors (39/91) and marquees (14/91) are common but optional; nobody ships CSS scroll-driven animations yet.
5. Dated: hero carousels (<1% click past slide 1), heavy parallax, desktop hamburgers, mandatory preloaders, Bootstrap/Font Awesome/Open Sans stacks, template sameness.
6. Functions now expected: filters + search + list/grid, lightbox zoom, keyboard nav, IT/EN, related works, map of public works, timeline, newsletter, optional dark theme, accessibility modes.
7. Stone-sculptor sites are behind the curve (Viale, Randall-Page, Blumenfeld on 2015-era WordPress); only Jago goes dark and animated — an open field.
8. For white stone photographed outdoors, light grounds win: B2 and the light halves of B3/C1/C2 keep sky and grass honest; dark UIs (B1) suit slate and studio shots only.
9. Recommended B: **B3 "Ardesia e Majella"** — a dual-tone concept that is literally the materials (slate #1B1D1F ↔ Majella #EDEAE3, stone-gold #C9A57A, Fraunces/Geist/Geist Mono, pinned home, theme-by-material), with B1 "Nero Ardesia" as the all-dark variant and B2 "Bianco Assoluto" as the lean index-first variant.
10. Recommended C: **C1 "Pietra e Grafite"** — keep A's paper (#F4F2EC) and Newsreader for reading, switch display to Bricolage Grotesque, metadata to IBM Plex/Geist Mono, accent to ardesia blue-grey #3E4A52, replace fade-ins with clip-path reveals, add the typographic index with hover previews, list⇄grid Flip, sticky captions and View Transitions.
11. Fonts: pairing 3 (Bricolage + Newsreader + Plex Mono) for C1, pairing 2 (Fraunces + Hanken/Geist + Geist Mono) or 5 (General Sans + Sentient) for B3, pairing 4 (Geist family) for B1/B2 — all free and verified.
12. Every proposed text colour passes WCAG AA (primary text AAA); body ≥18px, `prefers-reduced-motion` respected, light default everywhere except B1 — the three audiences (critics, galleries, a 75-year-old artist) are served by restraint first, motion second.
