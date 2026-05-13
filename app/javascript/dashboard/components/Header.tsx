import React from "react"
import { useI18n, LangSelector } from "../../i18n"
import { useIsMobile } from "../useIsMobile"
import { colors, gradients, shadows, fonts } from "../theme"

interface Props {
  authCode: string
  setAuthCode: (v: string) => void
  loading: boolean
  onFetch: () => void
  onShowOnboarding: () => void
}

export const Header = ({ authCode, setAuthCode, loading, onFetch, onShowOnboarding }: Props) => {
  const { t } = useI18n()
  const isMobile = useIsMobile()

  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "stretch" : "center",
      justifyContent: "space-between",
      gap: isMobile ? 16 : 0,
      marginBottom: isMobile ? 28 : 40,
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isMobile ? "space-between" : "flex-start",
        gap: 12,
      }}>
        <div style={{
          fontFamily: fonts.brand,
          fontSize: isMobile ? 18 : 22,
          fontWeight: 800,
          letterSpacing: "0.05em",
          background: gradients.brand,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          EPIC<span style={{ fontWeight: 400 }}>TRACKER</span>
        </div>
        {isMobile && <LangSelector />}
      </div>

      <div style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        flexWrap: isMobile ? "wrap" : "nowrap",
      }}>
        <a
          href="https://www.epicgames.com/id/api/redirect?clientId=34a02cf8f4414e29b15921876da36f9a&responseType=code"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: colors.muted50,
            textDecoration: "none",
            letterSpacing: "0.05em",
            borderBottom: `1px solid ${colors.muted20}`,
            paddingBottom: 1,
            transition: "color 0.2s ease",
            order: isMobile ? 1 : 0,
            width: isMobile ? "100%" : "auto",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = colors.muted90)}
          onMouseLeave={e => (e.currentTarget.style.color = colors.muted50)}
        >
          {t("header.getAuthCode")}
        </a>
        <input
          type="text"
          placeholder={t("header.placeholder")}
          value={authCode}
          onChange={e => setAuthCode(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onFetch()}
          style={{
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: 10,
            padding: "10px 16px",
            color: colors.textSoft,
            fontFamily: fonts.mono,
            fontSize: 13,
            width: isMobile ? "100%" : 280,
            flex: isMobile ? "1 1 100%" : "none",
            outline: "none",
            backdropFilter: "blur(12px)",
            order: isMobile ? 2 : 0,
          }}
        />
        <button
          onClick={onFetch}
          disabled={loading || !authCode.trim()}
          style={{
            background: loading ? colors.surfaceDim : gradients.cta,
            border: `1px solid ${colors.borderStrong}`,
            borderRadius: 10,
            padding: "10px 22px",
            color: colors.textBright,
            fontFamily: fonts.brand,
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.05em",
            boxShadow: loading ? "none" : shadows.cta,
            transition: "all 0.2s ease",
            opacity: loading ? 0.6 : 1,
            flex: isMobile ? "1 1 auto" : "none",
            order: isMobile ? 3 : 0,
          }}
        >
          {loading ? t("header.loading") : t("header.fetch")}
        </button>
        <button
          onClick={onShowOnboarding}
          aria-label={t("header.help")}
          title={t("header.helpTitle")}
          style={{
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: 10,
            width: 38,
            height: 38,
            color: colors.textMuted,
            fontFamily: fonts.brand,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(12px)",
            transition: "all 0.2s ease",
            flexShrink: 0,
            marginLeft: isMobile ? 0 : 18,
            order: isMobile ? 4 : 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = colors.textBright
            e.currentTarget.style.borderColor = colors.borderHover
            e.currentTarget.style.boxShadow = shadows.helpHover
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = colors.textMuted
            e.currentTarget.style.borderColor = colors.border
            e.currentTarget.style.boxShadow = "none"
          }}
        >
          ?
        </button>
        {!isMobile && <LangSelector />}
      </div>
    </div>
  )
}
