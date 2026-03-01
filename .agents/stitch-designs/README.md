# Stitch Designs — Ready for Implementation

Fetched from Stitch project `17298965758760609228` (Survivor 50 Watch Party — All Screens).

**→ See [NAVIGATION.md](./NAVIGATION.md) for a clear map of your favorited designs and a clean implementation path.**

## Design → Component Mapping

| File | Stitch Title | React Component | Notes |
|------|--------------|-----------------|-------|
| `01-sign-in.html` | Survivor Season 50 Sign In | `AuthScreen.jsx` | Magic link auth, Fijian theme |
| `02-rules-scoring.html` | Season 50 Rules & Scoring | `RulesTab.jsx` | Lawa, Sevu, Qito, Vaka-Viti sections |
| `03-bingo.html` | Season 50 Survivor Bingo | `BingoTab.jsx` | 5×5 bingo card, BULA callout |
| `04-scoreboard.html` | Fijian Scoreboard Desktop Dashboard | `ScoreboardTab.jsx` | Tovo Dashboard, tribal log, top survivors |

## Shared Design System (from Sign In)

- **Colors**: `earth` #2b1d12, `ochre` #8B4513, `sienna` #a0522d, `clay` #d2691e, `stone-dark` #0f0f0f, `sand-warm` #d4b483
- **Fonts**: Bebas Neue (display), Inter (sans), Lora (serif)
- **Patterns**: `.masi-pattern`, `.wood-texture`, `.cina-glow`, `.bure-silhouette`
- **Icons**: Material Symbols Outlined
- **Tailwind**: CDN with forms + container-queries plugins

## Implementation Checklist (when ready)

1. Map Stitch colors → `src/styles/theme.css` tokens (fire-400, torch, etc.)
2. Extract shared patterns/utilities into `src/styles/` or Tailwind config
3. Convert static HTML → React components (JSX, props, state)
4. Replace CDN Tailwind with project's Vite + Tailwind 4 setup
5. Wire up Firebase auth, data, and app logic
6. Preserve semantic HTML and `aria-*` attributes

## STYLE_GUIDE Reference

See `docs/STYLE_GUIDE.md` for token mapping and Stitch integration notes.
