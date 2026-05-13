import React from "react"
import { useI18n } from "../../i18n"
import { colors, fonts } from "../theme"

export const LoadingIndicator = ({ name }: { name: string }) => {
  const { t } = useI18n()
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      marginBottom: 24,
      color: colors.muted60,
      fontFamily: fonts.mono,
      fontSize: 12,
    }}>
      <div style={{
        width: 6, height: 6, borderRadius: "50%",
        background: colors.primary,
        boxShadow: `0 0 8px ${colors.primary}`,
        animation: "pulse 1s infinite",
      }} />
      {t("library.fetchingPrefix")} <span style={{ color: colors.textMuted, marginLeft: 4 }}>{name}</span>…
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}
