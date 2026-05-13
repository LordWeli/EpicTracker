import React from "react"
import { useI18n } from "../../i18n"

interface Props {
  count: number
  loadingGame: string | null
}

export const LibraryCounter = ({ count, loadingGame }: Props) => {
  const { t } = useI18n()
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        color: "rgba(196,181,253,0.4)",
        letterSpacing: "0.1em",
      }}>
        {t("library.label")}
      </span>
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 13,
        fontWeight: 700,
        color: "#a855f7",
      }}>
        {count}
      </span>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        color: "rgba(196,181,253,0.4)",
        letterSpacing: "0.1em",
      }}>
        {loadingGame ? t("library.gamesLoaded") : t("library.games")}
      </span>
    </div>
  )
}
