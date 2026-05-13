import React from "react"
import { Game } from "../types"
import { colors, gradients, shadows, fonts } from "../theme"

interface Props {
  game: Game
  onClick: () => void
  active: boolean
}

export const MiniCard = ({ game, onClick, active }: Props) => (
  <div
    onClick={onClick}
    style={{
      cursor: "pointer",
      borderRadius: 14,
      overflow: "hidden",
      border: `1px solid ${active ? colors.borderActive : colors.borderFaint}`,
      boxShadow: active ? shadows.miniActive : "none",
      background: colors.surfaceLow,
      backdropFilter: "blur(12px)",
      transition: "all 0.2s ease",
      transform: active ? "translateY(-2px)" : "none",
    }}
  >
    <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
      {game.image_url ? (
        <img
          src={game.image_url}
          alt={game.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div style={{
          width: "100%", height: "100%",
          background: gradients.placeholder,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 28, opacity: 0.3 }}>🎮</span>
        </div>
      )}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "20px 10px 10px",
        background: gradients.miniCardCaption,
      }}>
        <div style={{
          fontFamily: fonts.brand,
          fontSize: 11,
          fontWeight: 600,
          color: colors.textSoft,
          lineHeight: 1.3,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        } as React.CSSProperties}>
          {game.name}
        </div>
      </div>
    </div>
  </div>
)
