import React from "react"
import { useI18n } from "../../i18n"
import { colors, fonts } from "../theme"

export const EmptyState = () => {
  const { t } = useI18n()
  return (
    <div style={{
      textAlign: "center",
      padding: "80px 0",
      color: colors.muted30,
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🎮</div>
      <div style={{ fontFamily: fonts.brand, fontSize: 15, fontWeight: 600, letterSpacing: "0.1em" }}>
        {t("empty.message")}
      </div>
    </div>
  )
}
