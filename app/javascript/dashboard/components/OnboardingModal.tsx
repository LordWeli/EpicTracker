import React, { useState } from "react"
import { useI18n, format } from "../../i18n"
import { ONBOARDING_KEY } from "../constants"
import { useIsMobile } from "../useIsMobile"
import { colors, gradients, shadows, fonts } from "../theme"

export const OnboardingModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useI18n()
  const [step, setStep] = useState(0)
  const isMobile = useIsMobile()

  const pillMono = {
    fontFamily: fonts.mono,
    color: colors.textSoft,
    background: colors.glow25,
    border: `1px solid ${colors.borderStrong}`,
    borderRadius: 6,
    padding: "2px 8px",
    fontSize: 12,
  } as React.CSSProperties

  const highlight = { color: colors.pinkAccent, fontWeight: 600 } as React.CSSProperties

  const pillFetch = {
    fontFamily: fonts.brand,
    fontWeight: 700,
    color: colors.textBright,
    background: gradients.cta,
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
        field: <span style={{ fontFamily: fonts.mono, color: colors.pinkAccent }}>{t("modal.step1.field")}</span>,
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
        background: colors.overlayLight,
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
          background: colors.surfaceModal,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${colors.border}`,
          borderRadius: 24,
          boxShadow: shadows.modal,
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
            color: colors.muted50,
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
            e.currentTarget.style.color = colors.textSoft
            e.currentTarget.style.background = colors.borderTrace
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = colors.muted50
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
            fontFamily: fonts.brand,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: colors.borderActive,
            textTransform: "uppercase",
            marginBottom: 12,
            textAlign: "center",
          }}>
            {current.badge}
          </div>

          <div style={{
            fontFamily: fonts.brand,
            fontSize: isMobile ? 20 : 24,
            fontWeight: 700,
            background: gradients.brand,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 18,
            textAlign: "center",
            letterSpacing: "0.02em",
          }}>
            {current.title}
          </div>

          <div style={{
            fontFamily: fonts.mono,
            fontSize: 13,
            lineHeight: 1.7,
            color: colors.muted80,
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
              border: `1px solid ${colors.borderSoft}`,
              borderRadius: 10,
              padding: "10px 18px",
              color: step === 0 ? colors.muted25 : colors.muted80,
              fontFamily: fonts.brand,
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
                  background: i === step ? gradients.cta : colors.border,
                  boxShadow: i === step ? shadows.dotActive : "none",
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
              background: gradients.cta,
              border: `1px solid ${colors.borderStrong}`,
              borderRadius: 10,
              padding: "10px 22px",
              color: colors.textBright,
              fontFamily: fonts.brand,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.1em",
              boxShadow: shadows.cta,
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
