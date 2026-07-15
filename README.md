# DAYLY — web

Marketingový web pro DAYLY (osobní AI agent pro každý den). Druhá generace —
přepsáno ze statického HTML na Next.js aplikaci s routingem.

Původní statická verze je zachovaná v [`legacy/`](legacy/).

## Stack

| Vrstva          | Technologie                                              |
| --------------- | -------------------------------------------------------- |
| Runtime / PM    | [Bun](https://bun.sh)                                     |
| Framework       | Next.js 15 (App Router, TypeScript)                       |
| Animace (UI)    | [motion](https://motion.dev) — reveals, accordion, layout |
| Animace (scroll)| GSAP + ScrollTrigger — timeline, pinned pipeline          |
| Smooth scroll   | [Lenis](https://lenis.darkroom.engineering) napojený na GSAP ticker |
| 3D              | Three.js — shader pole bodů v hero (bez react-three-fiber) |
| Přechody stránek| [next-view-transitions](https://github.com/shuding/next-view-transitions) (View Transitions API) |
| Styly           | CSS Modules + design tokens v `globals.css` — **žádný Tailwind** |
| Fonty           | Geist Sans/Mono (balíček `geist`), Instrument Serif (`@fontsource`) — self-hosted |

Barevné schéma: [oldworld.nvim](https://github.com/dgox16/oldworld.nvim)
(default varianta). Kompletní paleta je v `src/app/globals.css` jako `--ow-*`
proměnné; komponenty používají sémantické tokeny (`--bg`, `--text`, `--accent`, …).

## Vývoj

```bash
bun install
bun dev          # http://localhost:3000
```

```bash
bun run build    # produkční build
bun run start    # produkční server
bun run typecheck
```

## Struktura

```
src/
├── app/
│   ├── layout.tsx          # ViewTransitions + Lenis provider + Nav/Footer
│   ├── page.tsx            # domů (Three.js hero, timeline, …)
│   ├── produkt/            # feature deep-dives
│   ├── technologie/        # paměť, RAG pipeline (pinned), soukromí, stack
│   ├── cena/               # plány, srovnání, FAQ
│   ├── vize/               # manifest, principy, roadmapa
│   ├── api/waitlist/       # POST endpoint pro waitlist
│   └── globals.css         # design tokens + sdílené primitivy
└── components/
    ├── layout/             # Nav, Footer, Logo
    ├── providers/          # SmoothScrolling (Lenis ⇄ ScrollTrigger)
    ├── ui/                 # Reveal, SectionHead, Counter, PageHero, CTA, form
    ├── three/              # HeroCanvas
    ├── home/ produkt/ technologie/ cena/   # sekce jednotlivých stránek
```

## Poznámky k implementaci

- **Reduced motion** se respektuje všude: Lenis se nezapíná, GSAP animace
  přeskočí (`gsap.matchMedia`), Three.js vyrenderuje jediný statický snímek,
  motion reveals se vypnou.
- **Three.js scéna** má DPR strop 2, pauzu mimo viewport a plný cleanup při
  unmountu. Když WebGL není k dispozici, hero má CSS fallback pozadí.
- **Waitlist**: `src/app/api/waitlist/route.ts` validuje e-mail; skutečné
  uložení se napojuje v jediné funkci `saveToWaitlist` (Resend / Supabase / …).
- **View transitions** fungují mezi všemi stránkami; navigace je vyjmutá
  z root přechodu přes `view-transition-name: site-nav`.
