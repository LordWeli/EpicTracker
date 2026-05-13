import React, { useState } from "react"
import { useI18n, format } from "../../i18n"
import { ONBOARDING_KEY } from "../constants"
import { useIsMobile } from "../useIsMobile"

export const OnboardingModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useI18n()
  const [step, setStep] = useState(0)
  const isMobile = useIsMobile()

  const pillMono = {
    fontFamily: "'DM Mono', monospace",
    color: "#e9d5ff",
    background: "rgba(124,58,237,0.25)",
    border: "1px solid rgba(167,139,250,0.3)",
    borderRadius: 6,
    padding: "2px 8px",
    fontSize: 12,
  } as React.CSSProperties

  const highlight = { color: "#f0abfc", fontWeight: 600 } as React.CSSProperties

  const pillFetch = {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    color: "#f3e8ff",
    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
    borderRadius: 6,
    padding: "2px 10px",
    fontSize: 12,
    letterSpacing: "0.05em",
  } as React.CSSProperties

  const slides = [
    {
      badge: t("modal.welcome.badge"),
      title: t("modal.welcome.title"),
      body: format(t("modal.welcome.body"), {
        epic: <span style={highlight}>{t("modal.welcome.epic")}</span>,
        hltb: <span style={highlight}>{t("modal.welcome.hltb")}</span>,
      }),
      icon: "🎮",
    },
    {
      badge: t("modal.step1.badge"),
      title: t("modal.step1.title"),
      body: format(t("modal.step1.body"), {
        button: <span style={pillMono}>{t("modal.step1.button")}</span>,
        field: <span style={{ fontFamily: "'DM Mono', monospace", color: "#f0abfc" }}>{t("modal.step1.field")}</span>,
      }),
      icon: "🔑",
    },
    {
      badge: t("modal.step2.badge"),
      title: t("modal.step2.title"),
      body: format(t("modal.step2.body"), {
        input: <span style={pillMono}>{t("modal.step2.input")}</span>,
        fetch: <span style={pillFetch}>{t("modal.step2.fetch")}</span>,
      }),
      icon: "📚",
    },
  ]

  const current = slides[step]
  const isLast = step === slides.length - 1

  const finish = () => {
    try { localStorage.setItem(ONBOARDING_KEY, "1") } catch {}
    onClose()
  }

  return (
    <div
      onClick={finish}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(13,5,21,0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? 12 : 24,
        animation: "fadeIn 0.25s ease",
      }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 540,
          background: "rgba(88,28,135,0.18)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(167,139,250,0.25)",
          borderRadius: 24,
          boxShadow: "0 0 80px rgba(124,58,237,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}
      >
        <button
          onClick={finish}
          aria-label={t("modal.close")}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "transparent",
            border: "none",
            color: "rgba(196,181,253,0.5)",
            fontSize: 20,
            cursor: "pointer",
            width: 32,
            height: 32,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            zIndex: 1,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "#e9d5ff"
            e.currentTarget.style.background = "rgba(167,139,250,0.1)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "rgba(196,181,253,0.5)"
            e.currentTarget.style.background = "transparent"
          }}
        >
          ×
        </button>

        <div style={{ padding: isMobile ? "44px 22px 24px" : "44px 40px 32px" }}>
          <div style={{ fontSize: isMobile ? 40 : 48, marginBottom: 20, textAlign: "center" }}>
            {current.icon}
          </div>

          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: "rgba(167,139,250,0.6)",
            textTransform: "uppercase",
            marginBottom: 12,
            textAlign: "center",
          }}>
            {current.badge}
          </div>

          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: isMobile ? 20 : 24,
            fontWeight: 700,
            background: "linear-gradient(135deg, #e9d5ff, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 18,
            textAlign: "center",
            letterSpacing: "0.02em",
          }}>
            {current.title}
          </div>

          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
            lineHeight: 1.7,
            color: "rgba(196,181,253,0.8)",
            textAlign: "center",
            minHeight: isMobile ? 140 : 110,
          }}>
            {current.body}
          </div>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "16px 18px 20px" : "20px 28px 28px",
          gap: isMobile ? 8 : 16,
        }}>
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              background: "transparent",
              border: "1px solid rgba(167,139,250,0.2)",
              borderRadius: 10,
              padding: "10px 18px",
              color: step === 0 ? "rgba(196,181,253,0.25)" : "rgba(196,181,253,0.8)",
              fontFamily: "'Syne', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              cursor: step === 0 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              opacity: step === 0 ? 0.4 : 1,
            }}
          >
            {t("modal.back")}
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={t("modal.dotAria", { n: i + 1 })}
                style={{
                  width: i === step ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  background: i === step
                    ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                    : "rgba(167,139,250,0.25)",
                  boxShadow: i === step ? "0 0 12px rgba(124,58,237,0.5)" : "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => isLast ? finish() : setStep(s => s + 1)}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              border: "1px solid rgba(167,139,250,0.3)",
              borderRadius: 10,
              padding: "10px 22px",
              color: "#f3e8ff",
              fontFamily: "'Syne', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.1em",
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
              transition: "all 0.2s ease",
            }}
          >
            {isLast ? t("modal.gotIt") : t("modal.next")}
          </button>
        </div>
      </div>
    </div>
  )
}
