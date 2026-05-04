#!/usr/bin/env python3

import asyncio
import sys
import json
import logging
import re
from howlongtobeatpy import HowLongToBeat

logging.disable(logging.CRITICAL)

def normalize_variants(name: str) -> list[str]:
    variants = []

    # Remove caracteres especiais
    clean = re.sub(r'[™®©]', '', name).strip()
    variants.append(clean)

    # Remove conteúdo entre parênteses
    no_parens = re.sub(r'\s*\(.*?\)', '', clean).strip()
    if no_parens != clean:
        variants.append(no_parens)

    # Troca ' - ' por ': '
    with_colon = re.sub(r'\s+-\s+', ': ', clean)
    if with_colon != clean:
        variants.append(with_colon)

    # Remove subtítulo após ' - '
    no_subtitle = re.sub(r'\s+-\s+.*$', '', clean).strip()
    if no_subtitle != clean:
        variants.append(no_subtitle)

    return variants

async def fetch_game_times(game_name: str) -> dict:
    variants = normalize_variants(game_name)

    for variant in variants:
        results = await HowLongToBeat().async_search(variant, similarity_case_sensitive=False)
        if results:
            game = max(results, key=lambda e: e.similarity)
            return {
                "name":          game.game_name,
                "image_url":     game.game_image_url,
                "release_year":  game.release_world,
                "main_story":    game.main_story,
                "main_extra":    game.main_extra,
                "completionist": game.completionist,
            }

    return { "error": f"Jogo não encontrado: {game_name}" }

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