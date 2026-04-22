# DAYLY — Web Preview

Animovaná upoutávka pro DAYLY (osobní AI agent pro každý den).

## Lokální spuštění

Stačí otevřít `index.html` v prohlížeči — žádný build step, žádné dependencies.

Pokud potřebuješ lokální server (kvůli některým prohlížečovým restrikcím):

```bash
# Python 3
python3 -m http.server 8000

# nebo Node
npx serve .
```

## Nasazení na GitHub Pages

1. Vytvoř nový GitHub repozitář (např. `dayly-web`).
2. Inicializuj a pushni:

   ```bash
   cd /Users/nexus/Desktop/Developer/DAYLY/DAYLYweb
   git init
   git add .
   git commit -m "Initial DAYLY landing page"
   git branch -M main
   git remote add origin https://github.com/<uzivatel>/dayly-web.git
   git push -u origin main
   ```

3. V GitHubu: **Settings → Pages → Source: `Deploy from a branch` → `main` / `/ (root)`**.
4. Po pár vteřinách bude web na `https://<uzivatel>.github.io/dayly-web/`.

## Struktura

```
DAYLYweb/
├── index.html      # všechny sekce
├── styles.css      # design system + animace
├── script.js       # scroll reveal, parallax, starfield, form
└── README.md
```

## Sekce

1. Hero — animované orby, starfield, floating phone mock, chips
2. Marquee — pásmo integrací
3. Vize — 3 pilíře
4. Produkt — 5 funkcionalit
5. Den s DAYLY — timeline s ranní → večerní rutinou
6. Technologie — RAG flow + tech stack + privacy
7. Cena — Free / Pro / Teams
8. Roadmap — 3 fáze
9. Konkurence — srovnávací tabulka
10. CTA waitlist + footer

## Customizace

- **Barvy:** uprav CSS proměnné v `:root` v `styles.css`.
- **Texty:** přímo v `index.html` (česky, ladí s PDF).
- **Form backend:** `handleWaitlist()` v `script.js` — propoj na Mailchimp / ConvertKit / Supabase.
