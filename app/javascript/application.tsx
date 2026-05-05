// app/javascript/application.tsx
import React from "react"
import { createRoot } from "react-dom/client"
import Dashboard from "./Dashboard"

const container = document.getElementById("root")
if (container) {
  createRoot(container).render(<Dashboard />)
}
