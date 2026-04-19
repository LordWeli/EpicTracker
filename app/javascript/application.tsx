// app/javascript/application.tsx
import React from "react"
import { createRoot } from "react-dom/client"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <h1 className="text-2xl font-bold">EpicTracker</h1>
    </div>
  )
}

const container = document.getElementById("root")
if (container) {
  createRoot(container).render(<App />)
}
