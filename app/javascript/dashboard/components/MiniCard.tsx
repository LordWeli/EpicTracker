import React from "react"
import { Game } from "../types"

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
      border: active
        ? "1px solid rgba(167,139,250,0.6)"
        : "1px solid rgba(167,139,250,0.12)",
      boxShadow: active ? "0 0 20px rgba(124,58,237,0.3)" : "none",
      background: "rgba(88,28,135,0.1)",
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
          background: "linear-gradient(135deg, rgba(88,28,135,0.4), rgba(49,10,101,0.6))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 28, opacity: 0.3 }}>🎮</span>
        </div>
      )}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "20px 10px 10px",
        background: "linear-gradient(to top, rgba(13,5,21,0.95), transparent)",
      }}>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          color: "#e9d5ff",
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
