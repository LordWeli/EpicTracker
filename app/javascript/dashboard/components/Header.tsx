import React from "react"
import { useI18n, LangSelector } from "../../i18n"

interface Props {
  authCode: string
  setAuthCode: (v: string) => void
  loading: boolean
  onFetch: () => void
  onShowOnboarding: () => void
}

export const Header = ({ authCode, setAuthCode, loading, onFetch, onShowOnboarding }: Props) => {
  const { t } = useI18n()
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: "0.05em",
        background: "linear-gradient(135deg, #e9d5ff, #a855f7)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        EPIC<span style={{ fontWeight: 400 }}>TRACKER</span>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <a
          href="https://www.epicgames.com/id/api/redirect?clientId=34a02cf8f4414e29b15921876da36f9a&responseType=code"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "rgba(196,181,253,0.5)",
            textDecoration: "none",
            letterSpacing: "0.05em",
            borderBottom: "1px solid rgba(196,181,253,0.2)",
            paddingBottom: 1,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(196,181,253,0.9)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(196,181,253,0.5)")}
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
            background: "rgba(88,28,135,0.15)",
            border: "1px solid rgba(167,139,250,0.25)",
            borderRadius: 10,
            padding: "10px 16px",
            color: "#e9d5ff",
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
            width: 280,
            outline: "none",
            backdropFilter: "blur(12px)",
          }}
        />
        <button
          onClick={onFetch}
          disabled={loading || !authCode.trim()}
          style={{
            background: loading
              ? "rgba(88,28,135,0.3)"
              : "linear-gradient(135deg, #7c3aed, #a855f7)",
            border: "1px solid rgba(167,139,250,0.3)",
            borderRadius: 10,
            padding: "10px 22px",
            color: "#f3e8ff",
            fontFamily: "'Syne', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.05em",
            boxShadow: loading ? "none" : "0 0 20px rgba(124,58,237,0.3)",
            transition: "all 0.2s ease",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? t("header.loading") : t("header.fetch")}
        </button>
        <button
          onClick={onShowOnboarding}
          aria-label={t("header.help")}
          title={t("header.helpTitle")}
          style={{
            background: "rgba(88,28,135,0.15)",
            border: "1px solid rgba(167,139,250,0.25)",
            borderRadius: 10,
            width: 38,
            height: 38,
            color: "#c4b5fd",
            fontFamily: "'Syne', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(12px)",
            transition: "all 0.2s ease",
            flexShrink: 0,
            marginLeft: 18,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "#f3e8ff"
            e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)"
            e.currentTarget.style.boxShadow = "0 0 16px rgba(124,58,237,0.25)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "#c4b5fd"
            e.currentTarget.style.borderColor = "rgba(167,139,250,0.25)"
            e.currentTarget.style.boxShadow = "none"
          }}
        >
          ?
        </button>
        <LangSelector />
      </div>
    </div>
  )
}
