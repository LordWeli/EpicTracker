// app/javascript/application.tsx
import React from "react"
import { createRoot } from "react-dom/client"
import Dashboard from "./Dashboard"
import { I18nProvider } from "./i18n"

const container = document.getElementById("root")
if (container) {
  createRoot(container).render(
    <I18nProvider>
      <Dashboard />
    </I18nProvider>
  )
}
