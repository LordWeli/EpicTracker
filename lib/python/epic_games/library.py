# lib/python/epic_games/library.py
#!/usr/bin/env python3

import asyncio
import sys
import json
import logging
from egs_api import EpicGames

logging.disable(logging.CRITICAL)

async def authenticate(auth_code: str) -> EpicGames:
    egs = EpicGames()

    if not await egs.auth_code(None, auth_code):
        raise RuntimeError("auth_code inválido ou expirado")

    await egs.login()
    return egs

async def fetch_library(egs: EpicGames) -> list:
    records = []
    cursor  = None

    while True:
        url = "https://library-service.live.use1a.on.epicgames.com/library/api/public/items?includeMetadata=false"
        if cursor:
            url += f"&cursor={cursor}"

        response     = await egs.api._make_request("GET", url)
        page_records = response.get("records", [])
        records.extend(page_records)

        metadata = response.get("responseMetadata")
        cursor   = metadata.get("nextCursor") if metadata else None

        if not cursor:
            break

    return records

async def fetch_title(egs: EpicGames, namespace: str, catalog_item_id: str) -> tuple[str, str]:
    try:
        url = f"https://catalog-public-service-prod06.ol.epicgames.com/catalog/api/shared/namespace/{namespace}/bulk/items?id={catalog_item_id}&country=us&locale=en"
        response = await egs.api._make_request("GET", url)
        item     = list(response.values())[0] if response else {}
        title    = item.get("title") or "Unknown"
        return namespace, title
    except Exception:
        return namespace, "Unknown"

async def main():
    if len(sys.argv) < 3 or sys.argv[1] != "auth_code":
        print(json.dumps({ "error": "Uso: library.py auth_code <valor>" }))
        sys.exit(1)

    auth_code = sys.argv[2]

    try:
        egs     = await authenticate(auth_code)
        records = await fetch_library(egs)

        # Filtra apenas jogos e deduplica por namespace
        seen       = set()
        unique     = []
        for r in records:
            if r.get("recordType") != "APPLICATION":
                continue
            ns = r.get("namespace")
            if ns not in seen:
                seen.add(ns)
                unique.append(r)

        # Busca títulos reais em paralelo
        tasks  = [fetch_title(egs, r.get("namespace"), r.get("catalogItemId")) for r in unique]
        titles = await asyncio.gather(*tasks)
        await egs.close()

        title_map = dict(titles)

        games = [
            { "name": title_map.get(r.get("namespace"), "Unknown") }
            for r in unique
        ]

        print(json.dumps({ "library": games }))

    except Exception as e:
        print(json.dumps({ "error": str(e) }))
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())
