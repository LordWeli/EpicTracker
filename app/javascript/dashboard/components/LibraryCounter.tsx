import React from "react"
import { useI18n } from "../../i18n"
import { colors, fonts } from "../theme"

interface Props {
  count: number
  loadingGame: string | null
}

export const LibraryCounter = ({ count, loadingGame }: Props) => {
  const { t } = useI18n()
  const labelStyle: React.CSSProperties = {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.muted40,
    letterSpacing: "0.1em",
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
      <span style={labelStyle}>{t("library.label")}</span>
      <span style={{
        fontFamily: fonts.brand,
        fontSize: 13,
        fontWeight: 700,
        color: colors.primary,
      }}>
        {count}
      </span>
      <span style={labelStyle}>
        {loadingGame ? t("library.gamesLoaded") : t("library.games")}
      </span>
    </div>
  )
}
