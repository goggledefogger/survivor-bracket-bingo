# Stitch Re-Fetch Comparison (C)

Re-fetched from Stitch project `17298965758760609228` on 2026-03-01. The API does not expose favorites — we picked one canonical screen per type.

## What We Fetched

| Type | Stitch Title | File | Design System |
|------|--------------|------|---------------|
| Sign In | Survivor Season 50 Sign In | `live-01-sign-in-survivor.html` | Be Vietnam Pro, primary #e9742b, accent-yellow #f5b731, jungle-texture bg, fire emoji |
| Rules | Season 50 Rules & Scoring | `live-02-rules-scoring.html` | Bebas Neue, Cormorant Garamond, terracotta #a64d32, magimagi-border, masi-texture |
| Bingo | Season 50 Survivor Bingo | `live-03-bingo.html` | Bebas Neue, Inter, fire-orange #e8722a, torch-yellow #f5b731, tapa-texture, palm-silhouette |
| Scoreboard | Fijian Scoreboard Desktop Dashboard | `live-04-scoreboard.html` | Be Vietnam Pro, Rye, primary #d97706, wood-btn, tribal-border, "VitiScores" branding |

## Local vs Live

| Screen | Our Local (`01-` … `04-`) | Live Stitch | Match? |
|--------|---------------------------|-------------|--------|
| **Sign In** | Earth/ochre, masi-pattern, torch logo, Bebas+Lora | Fire/jungle, emoji, Be Vietnam Pro | ❌ Different |
| **Rules** | Same terracotta, magimagi, Cormorant | Same | ✅ Same |
| **Bingo** | masi-ochre, Fondamento, bamboo-border | fire-orange, Bebas, tapa-texture | ❌ Different |
| **Scoreboard** | Bebas, Rye, "SURVIVOR 50 HQ" | Be Vietnam Pro, Rye, "VitiScores" | ⚠️ Similar, different branding |

## Design Systems Summary

**Live Sign In** (fire/jungle):
- Fonts: Be Vietnam Pro
- Colors: primary #e9742b, accent-yellow #f5b731
- Background: jungle-texture (image overlay)
- Hero: fire emoji, no torch logo

**Our Local Sign In** (earth/Fijian):
- Fonts: Bebas Neue, Inter, Lora
- Colors: earth, ochre, sienna, clay, sand-warm
- Background: masi-pattern (SVG), bure-silhouette
- Hero: torch logo, wood-texture gradient text

**Live Bingo** (fire/torch):
- Fonts: Bebas Neue, Inter
- Colors: fire-orange, torch-yellow, sand
- Background: tapa-texture, palm-silhouette

**Our Local Bingo** (masi):
- Fonts: Fondamento, Bebas, Inter
- Colors: masi-ochre, masi-red, masi-cream, flame-orange
- Grid: magimagi-edge, bamboo-border on squares

---

## All 22 Screens in Stitch

The project has many variants. Titles include: Survivor Season 50 Sign In (×5), Fijian Sign In Desktop (×3), Season 50 Rules & Scoring (×4), Fijian Rules Desktop (×2), Season 50 Survivor Bingo (×4), Fijian Bingo Desktop (×2), Fijian Scoreboard Desktop Dashboard (×3), Season 50 Bracket Draft, Season 50 Watch Party Scores.

**Favorites are not exposed by the API** — we picked one per type. If you favorited different variants, open Stitch, note the screen titles, and we can fetch those by ID.

---

## Next Step: Choose Your Source

**Before implementing, confirm which designs you want:**

1. **Live** — Use `live-*.html` (fire/jungle theme, Be Vietnam Pro, emoji hero)
2. **Local** — Use `01-` … `04-` (earth/ochre Fijian theme, Bebas+Lora, torch logo)
3. **Hybrid** — e.g. Live for Bingo/Scoreboard, Local for Sign In

Reply with 1, 2, or 3 (and any specifics), and we’ll implement carefully from there.

## Implemented: Merged Approach (2026-03-01)

**Chosen:** Local base + Bingo masi + Scoreboard Rye + Rules magimagi.

| Screen | Changes |
|--------|---------|
| AuthScreen | Unchanged |
| BingoTab | Fondamento, masi palette, magimagi-edge, bamboo-border |
| ScoreboardTab | Rye for points, tribal-card-outer, amber icons |
| RulesTab | magimagi-border-rules |
| DraftTab | Unchanged |
