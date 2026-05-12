# lib/python/epic_games/library.py
#!/usr/bin/env python3

import re
import sys
import json
import logging
from legendary.core import LegendaryCore

logging.disable(logging.CRITICAL)

EXCLUDE_RE = re.compile(
    r"\b(?:"
    r"demo|"
    r"beta|"
    r"tech\s+(?:test|beta|preview|alpha)|"
    r"public\s+(?:test|beta)|"
    r"open\s+beta|"
    r"closed\s+beta|"
    r"playtest|"
    r"preview|"
    r"trial|"
    r"soundtrack|"
    r"ost|"
    r"bonus\s+content|"
    r"season\s+pass|"
    r"dlc"
    r")\b",
    re.IGNORECASE,
)

ROMAN_MAP = {
    "i": "1", "ii": "2", "iii": "3", "iv": "4", "v": "5",
    "vi": "6", "vii": "7", "viii": "8", "ix": "9", "x": "10",
}

EDITION_SUFFIX_RE = re.compile(
    r"[\s\-–—:]+(?:"
    r"premium|standard|deluxe|ultimate|gold|special|definitive|enhanced|complete|legendary|"
    r"game\s+of\s+the\s+year|goty|director'?s\s+cut|remastered|anniversary|"
    r"free\s+weekend|free\s+trial|"
    r"legacy\s+mode|public\s+test(?:ing|\s+server)?|test\s+server|ptr|pts|"
    r"early\s+access|preview\s+build|next-?gen"
    r")(?:\s+(?:edition|cut|version|pack|bundle|build|mode))?\s*$",
    re.IGNORECASE,
)

ROMAN_TAIL_RE = re.compile(
    r"\s+(x|ix|viii|vii|vi|v|iv|iii|ii|i)\s*$",
    re.IGNORECASE,
)


def normalize_title(title):
    t = title.strip()
    # strip trademark/registered marks
    t = re.sub(r"[™®©]", "", t)
    # repeatedly strip edition suffixes (handles stacked "Premium Edition Bundle")
    while True:
        new = EDITION_SUFFIX_RE.sub("", t).strip()
        if new == t:
            break
        t = new
    # convert trailing roman numeral to arabic so "Chivalry II" == "Chivalry 2"
    t = ROMAN_TAIL_RE.sub(lambda m: " " + ROMAN_MAP[m.group(1).lower()], t)
    # collapse whitespace, lowercase
    t = re.sub(r"\s+", " ", t).strip().lower()
    return t


def is_real_game(game):
    title = (getattr(game, "app_title", "") or "").strip()
    if not title:
        return False

    if EXCLUDE_RE.search(title):
        return False

    meta = getattr(game, "metadata", {}) or {}

    # Skip DLC: legendary marks DLC entries with a mainGameItem reference.
    if meta.get("mainGameItem"):
        return False

    # Skip non-game catalog entries (engines, software, digital extras).
    cats = [c.get("path", "") for c in (meta.get("categories") or [])]
    if cats and not any(c.startswith("games") for c in cats):
        return False

    return True


def main():
    if len(sys.argv) < 3 or sys.argv[1] != "auth_code":
        print(json.dumps({"error": "Uso: library.py auth_code <valor>"}))
        sys.exit(1)

    auth_code = sys.argv[2]

    try:
        core = LegendaryCore()

        if not core.auth_code(auth_code):
            raise RuntimeError("auth_code inválido ou expirado")

        games, _ = core.get_game_and_dlc_list(skip_ue=True, force_refresh=True)

        # Dedupe by normalized title; keep the shortest original variant
        # so editions collapse onto the cleanest name (e.g. "Grand Theft Auto V"
        # wins over "Grand Theft Auto V Premium Edition").
        by_key = {}
        for game in games:
            if not is_real_game(game):
                continue
            title = game.app_title.strip()
            key = normalize_title(title)
            if not key:
                continue
            existing = by_key.get(key)
            if existing is None or len(title) < len(existing):
                by_key[key] = title

        library = sorted(
            ({"name": t} for t in by_key.values()),
            key=lambda x: x["name"].lower(),
        )

        print(json.dumps({"library": library}))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
