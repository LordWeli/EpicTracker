import React from "react"
import { colors, fonts } from "../theme"

export const ErrorBanner = ({ message }: { message: string }) => (
  <div style={{
    background: colors.dangerSurface,
    border: `1px solid ${colors.dangerBorder}`,
    borderRadius: 12,
    padding: "12px 20px",
    color: colors.textDanger,
    fontFamily: fonts.mono,
    fontSize: 13,
    marginBottom: 24,
  }}>
    {message}
  </div>
)
