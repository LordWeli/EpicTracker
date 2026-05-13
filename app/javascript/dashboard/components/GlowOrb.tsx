import React from "react"

interface Props {
  cx: string
  cy: string
  r: string
  color: string
}

export const GlowOrb = ({ cx, cy, r, color }: Props) => (
  <div
    style={{
      position: "absolute",
      left: cx, top: cy,
      width: r, height: r,
      borderRadius: "50%",
      background: color,
      filter: "blur(80px)",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />
)
