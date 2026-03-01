# Survivor 50 — Watch Party HQ

Bracket draft, bingo, and scoreboard for Survivor Season 50 watch parties.

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your Firebase config (see Firebase Console → Project Settings)
npm run dev
```

## Firebase

Config comes from env vars only — no hardcoded values.

| Env var | Description |
|---------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain |
| `VITE_FIREBASE_DATABASE_URL` | Realtime DB URL |
| `VITE_FIREBASE_PROJECT_ID` | Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | App ID |

Without `.env`, the app runs in UI-only mode (no auth, no sync).

**Stack:** React 19, Vite 7, Tailwind 4, Firebase (Auth + Realtime DB). See `docs/STYLE_GUIDE.md` for design system and React conventions.
