import React from "react"
import { useI18n } from "../../i18n"

export const LoadingIndicator = ({ name }: { name: string }) => {
  const { t } = useI18n()
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      marginBottom: 24,
      color: "rgba(196,181,253,0.6)",
      fontFamily: "'DM Mono', monospace",
      fontSize: 12,
    }}>
      <div style={{
        width: 6, height: 6, borderRadius: "50%",
        background: "#a855f7",
        boxShadow: "0 0 8px #a855f7",
        animation: "pulse 1s infinite",
      }} />
      {t("library.fetchingPrefix")} <span style={{ color: "#c4b5fd", marginLeft: 4 }}>{name}</span>…
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}
