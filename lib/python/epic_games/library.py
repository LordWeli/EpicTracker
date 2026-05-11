# lib/python/epic_games/library.py
#!/usr/bin/env python3

import sys
import json
import logging
from legendary.core import LegendaryCore

logging.disable(logging.CRITICAL)

def main():
    if len(sys.argv) < 3 or sys.argv[1] != "auth_code":
        print(json.dumps({ "error": "Uso: library.py auth_code <valor>" }))
        sys.exit(1)

    auth_code = sys.argv[2]

    try:
        core = LegendaryCore()

        if not core.auth_code(auth_code):
            raise RuntimeError("auth_code inválido ou expirado")

        games, _ = core.get_game_and_dlc_list(skip_ue=True, force_refresh=True)

        library = sorted(
            [{ "name": game.app_title } for game in games],
            key=lambda x: x["name"]
        )

        print(json.dumps({ "library": library }))

    except Exception as e:
        print(json.dumps({ "error": str(e) }))
        sys.exit(1)

if __name__ == "__main__":
    main()
