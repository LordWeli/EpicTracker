import React from "react"
import { useI18n } from "../../i18n"
import { Game } from "../types"
import { formatHours } from "../formatHours"

const TimeRow = ({ label, value }: { label: string; value: number | null }) => (
  <tr style={{ borderBottom: "1px solid rgba(167,139,250,0.1)" }}>
    <td style={{ padding: "10px 16px", color: "rgba(196,181,253,0.7)", fontSize: 13, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>
      {label}
    </td>
    <td style={{ padding: "10px 16px", textAlign: "right" }}>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 15,
        fontWeight: 600,
        color: value !== null ? "#e9d5ff" : "rgba(196,181,253,0.3)",
        letterSpacing: "0.05em",
      }}>
        {formatHours(value)}
      </span>
    </td>
  </tr>
)

export const FeaturedCard = ({ game }: { game: Game }) => {
  const { t } = useI18n()
  return (
    <div style={{
      display: "flex",
      gap: 0,
      background: "rgba(88,28,135,0.15)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(167,139,250,0.2)",
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "0 0 60px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
      minHeight: 320,
    }}>
      <div style={{ position: "relative", width: 260, flexShrink: 0 }}>
        {game.image_url ? (
          <img
            src={game.image_url}
            alt={game.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%", minHeight: 320,
            background: "linear-gradient(135deg, rgba(88,28,135,0.4), rgba(49,10,101,0.6))",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 48, opacity: 0.3 }}>🎮</span>
          </div>
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, transparent 60%, rgba(13,5,21,0.8))",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "24px 20px 20px",
          background: "linear-gradient(to top, rgba(13,5,21,0.95) 0%, transparent 100%)",
        }}>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: "#f3e8ff",
            lineHeight: 1.2,
            marginBottom: 4,
          }}>
            {game.name}
          </div>
          {game.release_year && (
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(196,181,253,0.6)" }}>
              {game.release_year}
            </div>
          )}
        </div>
      </div>

      <div style={{ flex: 1, padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.2em",
          color: "rgba(167,139,250,0.5)",
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
          <div style={{ color: "rgba(196,181,253,0.35)", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
            {t("library.notFound")}
          </div>
        )}
      </div>
    </div>
  )
}
