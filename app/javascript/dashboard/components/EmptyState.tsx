import React from "react"
import { useI18n } from "../../i18n"

export const EmptyState = () => {
  const { t } = useI18n()
  return (
    <div style={{
      textAlign: "center",
      padding: "80px 0",
      color: "rgba(196,181,253,0.3)",
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🎮</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.1em" }}>
        {t("empty.message")}
      </div>
    </div>
  )
}
