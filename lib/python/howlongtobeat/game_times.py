#!/usr/bin/env python3

import asyncio
import sys
import json
import logging
import re
from howlongtobeatpy import HowLongToBeat

logging.disable(logging.CRITICAL)

def normalize_name(name: str) -> str:
    name = re.sub(r'[™®©]', '', name)
    name = name.strip()
    return name

async def fetch_game_times(game_name: str) -> dict:
    normalized = normalize_name(game_name)
    results = await HowLongToBeat().async_search(normalized, similarity_case_sensitive=False)

    if not results:
        return { "error": f"Jogo não encontrado: {game_name}" }

    game = max(results, key=lambda e: e.similarity)

    return {
        "name":          game.game_name,
        "image_url":     game.game_image_url,
        "release_year":  game.release_world,
        "main_story":    game.main_story,
        "main_extra":    game.main_extra,
        "completionist": game.completionist,
    }

async def main():
    if len(sys.argv) < 2:
        print(json.dumps({ "error": "Uso: game_times.py <nome do jogo>" }))
        sys.exit(1)

    game_name = " ".join(sys.argv[1:])

    try:
        result = await fetch_game_times(game_name)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({ "error": str(e) }))
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())
