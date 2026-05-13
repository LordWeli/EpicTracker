import { useState } from "react"
import { useI18n } from "../i18n"
import { Game } from "./types"

export function useLibrary() {
  const { t } = useI18n()
  const [authCode, setAuthCode]       = useState("")
  const [games, setGames]             = useState<Game[]>([])
  const [featured, setFeatured]       = useState<Game | null>(null)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState<string | null>(null)
  const [loadingGame, setLoadingGame] = useState<string | null>(null)

  const fetchLibrary = async () => {
    if (!authCode.trim()) return
    setLoading(true)
    setError(null)
    setGames([])
    setFeatured(null)

    try {
      const res  = await fetch(`/epic_games/library?auth_code=${encodeURIComponent(authCode)}`)
      const data = await res.json()

      if (data.error) { setError(data.error); return }

      const names: string[] = (data.library || []).map((g: { name: string }) => g.name)
      if (!names.length) { setError(t("error.noGames")); return }

      const result: Game[] = []
      for (const name of names) {
        setLoadingGame(name)
        try {
          const r    = await fetch(`/howlongtobeat/game?name=${encodeURIComponent(name)}`)
          const d    = await r.json()
          const game: Game = d.error
            ? { name, image_url: null, release_year: null, main_story: null, main_extra: null, completionist: null, found: false }
            : { ...d.game, name, found: true }
          if (result.some(g => g.name === game.name)) continue
          result.push(game)
          setGames([...result])
          if (result.length === 1) setFeatured(game)
        } catch {
          result.push({ name, image_url: null, release_year: null, main_story: null, main_extra: null, completionist: null, found: false })
          setGames([...result])
        }
      }
      setLoadingGame(null)
    } catch {
      setError(t("error.serverConnection"))
    } finally {
      setLoading(false)
      setLoadingGame(null)
    }
  }

  const others = (() => {
    const seen = new Set<string>()
    const base = featured ? games.filter(g => g.name !== featured.name) : games
    return base.filter(g => {
      if (seen.has(g.name)) return false
      seen.add(g.name)
      return true
    })
  })()

  return {
    authCode, setAuthCode,
    games, featured, setFeatured,
    loading, error, loadingGame,
    fetchLibrary,
    others,
  }
}
