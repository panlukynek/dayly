# almanac — site

Marketing/docs site for [Almanac](https://github.com/panlukynek/tomasi-kafe),
a calm, local-first workspace (calendar + tasks + Obsidian vault + an
assistant that can actually read your notes). Written for people who read
source code, not for investors: the CTA is a `git clone`.

The previous iterations of this repo (a static Czech landing page and its
routed Next.js port for "DAYLY") live on in `legacy/` and git history.

## Stack

| Layer        | Choice                                                            |
| ------------ | ----------------------------------------------------------------- |
| Runtime / PM | [Bun](https://bun.sh)                                              |
| Framework    | Next.js **16.2.10** (App Router, TypeScript)                       |
| Transitions  | First-party View Transitions (`experimental.viewTransition`) — no extra dependency |
| Scroll       | [Lenis](https://lenis.darkroom.engineering) pumped by the GSAP ticker |
| Choreography | GSAP + ScrollTrigger, SplitText, DrawSVG (free since 3.13); `motion` for small in-view reveals |
| 3D           | three.js — ~5k shader points morphing cloud → grid with scroll     |
| Styling      | CSS Modules over custom properties — **no Tailwind**               |
| Type         | IBM Plex Sans / Mono / Serif via `@fontsource` (self-hosted)       |
| Colour       | [oldworld.nvim](https://github.com/dgox16/oldworld.nvim), default variant, verbatim |

### Supply-chain note (July 2026)

Versions were picked after checking this year's npm incidents (axios 1.14.1
backdoor, the TanStack compromise, node-ipc, the phantom-gyp/binding.gyp
worm). None of the dependencies here appear on the affected lists, and
Next 16.2.10 postdates Vercel's May 2026 coordinated security release.
The lockfile is committed; trust it over the ranges.

## Develop

```bash
bun install
bun dev          # http://localhost:3000
bun run build && bun run start
bun run typecheck
```

## Pages

- `/` — the scrollytelling pitch: three.js hero (scroll orders the chaos),
  scrub-brightened manifesto, pinned horizontal tour of the six app screens,
  "everything is a file" pin, and a pinned replay of one assistant exchange —
  chat on the left, raw SSE events on the right, scrubbed together.
- `/how-it-works` — architecture: the permission broker drawn with DrawSVG,
  where data lives, `safeResolve`, the nine tools (read free / write gated),
  pluggable providers.
- `/manual` — clone → install → optional key → run; pointing it at a vault;
  a Q&A of questions people actually ask.
- `/colophon` — the palette as click-to-copy swatches, the Plex specimen,
  Carbon structure notes, and what this site runs on.

## Implementation notes

- **Lenis** is instantiated manually inside the same effect that registers
  the GSAP ticker callback (`src/components/SmoothScroll.tsx`). The previous
  `<ReactLenis autoRaf={false}>` setup could end up with nothing pumping
  `lenis.raf()`, which eats wheel events without scrolling — the bug this
  rewrite fixes.
- **View transitions** use React's `<ViewTransition>` from the canary React
  vendored by Next 16 (`src/components/PageTransition.tsx`), with a fast
  0.14/0.18s crossfade — no translate, nothing expensive to rasterize.
- **Reduced motion** disables Lenis, all pins/scrubs/splits, and the particle
  loop (single static frame). The content reads complete without animation.
- Every GSAP piece cleans up via `gsap.matchMedia()` / killed triggers;
  the three.js scene disposes geometry, material and context on unmount.
