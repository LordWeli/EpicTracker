import React from "react"
import { GlowOrb } from "./GlowOrb"

export const Background = () => (
  <>
    <GlowOrb cx="15%" cy="20%" r="500px" color="rgba(109,40,217,0.18)" />
    <GlowOrb cx="80%" cy="60%" r="400px" color="rgba(139,92,246,0.12)" />
    <GlowOrb cx="50%" cy="90%" r="300px" color="rgba(168,85,247,0.1)" />

    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
      opacity: 0.4,
    }} />
  </>
)
