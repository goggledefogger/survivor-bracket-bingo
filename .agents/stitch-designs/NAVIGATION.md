# Stitch Design Navigation — Your Favorited Designs

Your 4 favorited Stitch designs and how to implement them cleanly.

**→ See [STITCH_COMPARISON.md](./STITCH_COMPARISON.md) for the re-fetch (C) — Live vs Local designs.**

## The Four Designs

| # | File | Screen | Design System |
|---|------|--------|----------------|
| 1 | `01-sign-in.html` | AuthScreen | **Base**: earth, ochre, sienna, clay, stone-dark, sand-warm. Bebas Neue, Inter, Lora. masi-pattern, wood-texture, bure-silhouette. |
| 2 | `02-rules-scoring.html` | RulesTab | charcoal, sand, bleached-sand, terracotta, masi-dark. Bebas Neue, Cormorant Garamond, Inter. magimagi-border, masi-texture. |
| 3 | `03-bingo.html` | BingoTab | masi-ochre, masi-red, masi-cream, masi-black, flame-orange. Fondamento, Bebas Neue, Inter. bamboo-border, magimagi-edge. |
| 4 | `04-scoreboard.html` | ScoreboardTab | primary #d97706, sand #d4b483, clay #3d342b. Bebas Neue, Rye, Be Vietnam Pro. wood-btn, tribal-card-frame. |

**The mess:** Each Stitch design used a different palette. We’ve been mixing them, which creates inconsistency.

---

## Clean Approach: One Base, Four Screens

**Base design system** (from Sign In — the most complete):

- **Colors:** earth `#2b1d12`, ochre `#8b4513`, sienna `#a0522d`, clay `#d2691e`, stone-dark `#0f0f0f`, sand-warm `#d4b483`
- **Fonts:** Bebas Neue (display), Inter (sans), Lora (serif)
- **Patterns:** masi-pattern, wood-texture, bure-silhouette, cina-glow

**Map other designs into this base:**

| Stitch design | Map to base |
|---------------|------------|
| Rules terracotta | → ochre / clay |
| Rules bleached-sand | → sand-warm |
| Bingo masi-ochre | → ochre |
| Bingo masi-cream | → sand-warm |
| Bingo flame-orange | → clay |
| Scoreboard primary #d97706 | → amber (already in theme) |
| Scoreboard sand | → sand-warm |

**Screen-specific overrides only when needed:**

- Bingo: Fondamento for “FIJIAN BINGO” and win text (carving feel)
- Scoreboard: Rye for points display (wood feel)
- Rules: Cormorant Garamond for section headers (optional)

---

## Current Implementation Status

| Screen | Status | Gaps |
|--------|--------|------|
| **AuthScreen** | ✅ Closest to Stitch | MasiBackground, FijianHero, FijianInput, FijianPrimaryButton all match 01 |
| **DraftTab** | ⚠️ No Stitch design | Uses base Fijian components; no dedicated Stitch file |
| **BingoTab** | ⚠️ Partial | Uses base colors; missing bamboo-border, magimagi-edge, Fondamento |
| **RulesTab** | ⚠️ Partial | Uses FijianCard; missing Rules-specific magimagi-border, scroll-container |
| **ScoreboardTab** | ⚠️ Partial | Has wood-btn, tribal-card-frame; missing Rye font, full card structure |

---

## Recommended Implementation Order

1. **Lock the base** — Ensure `theme.css` and `fijian.css` only use Sign In tokens. Remove or consolidate Bingo/Scoreboard-specific tokens that conflict.
2. **AuthScreen** — Treat as reference. No changes unless you want tweaks.
3. **BingoTab** — Add bamboo-border to squares, magimagi-edge to grid, Fondamento for header/win text. Keep base colors (ochre, sand-warm).
4. **ScoreboardTab** — Add Rye for points. Ensure tribal cards match Stitch structure (outer frame, inner gradient).
5. **RulesTab** — Add magimagi-border, scroll-container. Map terracotta → ochre.

---

## File Map

```
.agents/stitch-designs/
├── 01-sign-in.html      ← Base design (AuthScreen)
├── 02-rules-scoring.html
├── 03-bingo.html
├── 04-scoreboard.html
├── README.md
└── NAVIGATION.md        ← This file

src/
├── styles/
│   ├── theme.css        ← Single source of truth for tokens
│   └── fijian.css       ← Shared patterns (masi, wood, bamboo, etc.)
├── components/fijian/   ← Shared components (use these)
└── components/screens/  ← Screen-specific layout + content
```

---

## Next Step

Choose one:

- **A)** Implement the gaps above (bamboo, magimagi, Fondamento, Rye) so each screen matches its Stitch design.
- **B)** Simplify further: drop screen-specific fonts and use only Bebas Neue + Inter + Lora everywhere.
- **C)** Re-fetch the favorited designs from Stitch to confirm they’re still what you want.
