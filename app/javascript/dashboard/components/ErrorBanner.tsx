import React from "react"

export const ErrorBanner = ({ message }: { message: string }) => (
  <div style={{
    background: "rgba(220,38,38,0.1)",
    border: "1px solid rgba(220,38,38,0.3)",
    borderRadius: 12,
    padding: "12px 20px",
    color: "#fca5a5",
    fontFamily: "'DM Mono', monospace",
    fontSize: 13,
    marginBottom: 24,
  }}>
    {message}
  </div>
)
