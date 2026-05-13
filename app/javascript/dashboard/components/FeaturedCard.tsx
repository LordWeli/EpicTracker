import React from "react"
import { useI18n } from "../../i18n"
import { Game } from "../types"
import { formatHours } from "../formatHours"
import { useIsMobile } from "../useIsMobile"
import { colors, gradients, shadows, fonts } from "../theme"

const TimeRow = ({ label, value }: { label: string; value: number | null }) => (
  <tr style={{ borderBottom: `1px solid ${colors.borderTrace}` }}>
    <td style={{ padding: "10px 16px", color: colors.muted70, fontSize: 13, fontFamily: fonts.mono, whiteSpace: "nowrap" }}>
      {label}
    </td>
    <td style={{ padding: "10px 16px", textAlign: "right" }}>
      <span style={{
        fontFamily: fonts.mono,
        fontSize: 15,
        fontWeight: 600,
        color: value !== null ? colors.textSoft : colors.muted30,
        letterSpacing: "0.05em",
      }}>
        {formatHours(value)}
      </span>
    </td>
  </tr>
)

export const FeaturedCard = ({ game }: { game: Game }) => {
  const { t } = useI18n()
  const isMobile = useIsMobile()

  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: 0,
      background: colors.surface,
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: `1px solid ${colors.borderSoft}`,
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: shadows.card,
      minHeight: isMobile ? 0 : 320,
    }}>
      <div style={{
        position: "relative",
        width: isMobile ? "100%" : 260,
        height: isMobile ? 200 : "auto",
        flexShrink: 0,
      }}>
        {game.image_url ? (
          <img
            src={game.image_url}
            alt={game.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%", minHeight: isMobile ? 200 : 320,
            background: gradients.placeholder,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 48, opacity: 0.3 }}>🎮</span>
          </div>
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: isMobile ? gradients.overlayBottom : gradients.overlayRight,
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: isMobile ? "32px 18px 16px" : "24px 20px 20px",
          background: gradients.captionFromBottom,
        }}>
          <div style={{
            fontFamily: fonts.brand,
            fontSize: isMobile ? 16 : 18,
            fontWeight: 700,
            color: colors.textBright,
            lineHeight: 1.2,
            marginBottom: 4,
          }}>
            {game.name}
          </div>
          {game.release_year && (
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.muted60 }}>
              {game.release_year}
            </div>
          )}
        </div>
      </div>

      <div style={{
        flex: 1,
        padding: isMobile ? "20px 18px 24px" : "28px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <div style={{
          fontFamily: fonts.brand,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.2em",
          color: colors.accentMuted,
          textTransform: "uppercase",
          marginBottom: 16,
        }}>
          {t("library.timeToBeat")}
        </div>
        {game.found ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <TimeRow label={t("library.mainStory")}    value={game.main_story} />
              <TimeRow label={t("library.mainExtra")}    value={game.main_extra} />
              <TimeRow label={t("library.completionist")} value={game.completionist} />
            </tbody>
          </table>
        ) : (
          <div style={{ color: colors.muted35, fontFamily: fonts.mono, fontSize: 13 }}>
            {t("library.notFound")}
          </div>
        )}
      </div>
    </div>
  )
}
