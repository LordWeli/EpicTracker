# EpicTracker

EpicTracker connects to your Epic Games library via an Epic `auth_code`, lists every real game in the account (skipping DLCs, demos, betas and duplicate editions) and cross-references each title against [HowLongToBeat](https://howlongtobeat.com) to display average Main Story, Main + Extras and Completionist times.

Rails backend + Python scripts; React/TypeScript frontend with Tailwind. i18n in 9 languages (en, pt, es, ja, ru, de, fr, zh, it).

## Stack

- **Ruby** 3.3.3 · **Rails** 7.1.6 · **Puma**
- **Python 3** — `legendary-gl` (Epic client), `howlongtobeatpy`, `aiohttp`
- **React** 19 + **TypeScript** 6 · **esbuild** · **Tailwind** 3.4
- **Docker** (multi-stage Dockerfile for production)

## Architecture

```
HTTP request
   └─ Rails controller (epic_games / howlongtobeat)
        └─ Service (Open3.capture3)
             └─ Python script (lib/python/...)
                  ├─ legendary-gl    → Epic library
                  └─ howlongtobeatpy → game times
```

Routes:

| Method | Path | Purpose |
|--------|------|---------|
| GET    | `/dashboard`              | React SPA (main dashboard) |
| POST   | `/epic_games/library`     | List games from the Epic account (param: `auth_code`) |
| GET    | `/howlongtobeat/game`     | Fetch HLTB times (param: `name`) |
| GET    | `/up`                     | Healthcheck |

`LibraryService` normalizes titles (strips edition suffixes, converts trailing roman numerals, lowercases) and dedupes before returning. HLTB results are cached in-process by `Howlongtobeat::CacheService`.

## Local setup

Requirements: Ruby 3.3.3, Node 18+, Python 3.10+, `bundler`.

```bash
# Gems
bundle install

# Node dependencies
npm install

# Python dependencies (Epic script)
pip install -r lib/python/epic_games/requirements.txt
pip install howlongtobeatpy
```

## Running

In separate terminals:

```bash
# Build assets (JS + CSS) — add --watch for live rebuilds
npm run build
npm run build:css

# Rails server
bin/rails server
```

Open `http://localhost:3000/dashboard`.

## Usage

1. Open the dashboard.
2. Click **Get Auth Code** to open the Epic login page; copy the returned `authorizationCode`.
3. Paste it into the input and click **Fetch**.
4. Titles appear as a featured card + grid; click any card to promote it to featured.

## Docker

```bash
docker build -t epic-tracker .
docker run --rm -e RAILS_ENV=development -e BINDING=0.0.0.0 -p 3000:3000 epic-tracker
```

## Structure

```
app/
  controllers/
    dashboard/         # SPA entrypoint
    epic_games/        # POST /epic_games/library
    howlongtobeat/     # GET  /howlongtobeat/game
  services/
    epic_games/        # Open3 wrapper → library.py
    howlongtobeat/     # wrapper + in-memory cache
  javascript/
    Dashboard.tsx      # React root
    dashboard/         # hooks, theme, components
    i18n.tsx           # translation provider
lib/python/
  epic_games/library.py        # legendary-gl, normalize, dedupe
  howlongtobeat/game_times.py  # howlongtobeatpy
```

## Notes

- Epic `auth_code` is single-use and short-lived — generate a fresh one for each fetch.
- Nothing is persisted; data lives in memory for the duration of the request.
- Translations are dictionary-based in `app/javascript/i18n.tsx`.
