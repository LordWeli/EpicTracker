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

async def fetch_title(egs: EpicGames, namespace: str, catalog_item_ids: list[str]) -> tuple[str, str | None, bool]:
    try:
        base_titles = []
        only_addons = True

        for catalog_item_id in catalog_item_ids:
            url = f"https://catalog-public-service-prod06.ol.epicgames.com/catalog/api/shared/namespace/{namespace}/bulk/items?id={catalog_item_id}&country=us&locale=en"
            response = await egs.api._make_request("GET", url)
            item       = list(response.values())[0] if response else {}
            title      = item.get("title")
            categories = [c.get("path", "") for c in (item.get("categories") or [])]

            if "addons" not in categories:
                only_addons = False
                if title:
                    base_titles.append(title)

        if only_addons:
            return namespace, None, True

        best = min(base_titles, key=len) if base_titles else "Unknown"
        return namespace, best, False

    except Exception:
        return namespace, None, True

async def main():
    if len(sys.argv) < 3 or sys.argv[1] != "auth_code":
        print(json.dumps({ "error": "Uso: library.py auth_code <valor>" }))
        sys.exit(1)

    auth_code = sys.argv[2]

    try:
        egs     = await authenticate(auth_code)
        records = await fetch_library(egs)

        # Agrupa catalog_item_ids por namespace
        namespace_map: dict[str, list[str]] = {}
        for r in records:
            if r.get("recordType") != "APPLICATION":
                continue
            ns  = r.get("namespace")
            cid = r.get("catalogItemId")
            if ns not in namespace_map:
                namespace_map[ns] = []
            namespace_map[ns].append(cid)

        # Busca títulos em paralelo, passando todos os IDs do namespace
        tasks   = [fetch_title(egs, ns, cids) for ns, cids in namespace_map.items()]
        results = await asyncio.gather(*tasks)
        await egs.close()

        title_map = {ns: title for ns, title, is_addon in results if not is_addon}

        games = [
            { "name": title_map[ns] }
            for ns in namespace_map
            if ns in title_map
        ]

        games.sort(key=lambda x: x["name"])

        print(json.dumps({ "library": games }))

    except Exception as e:
        print(json.dumps({ "error": str(e) }))
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())
