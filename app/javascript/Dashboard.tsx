import React, { useState, useEffect } from "react"
import { ONBOARDING_KEY } from "./dashboard/constants"
import { useLibrary } from "./dashboard/useLibrary"
import { useIsMobile } from "./dashboard/useIsMobile"
import { colors, fonts } from "./dashboard/theme"
import { Background } from "./dashboard/components/Background"
import { Header } from "./dashboard/components/Header"
import { LibraryCounter } from "./dashboard/components/LibraryCounter"
import { ErrorBanner } from "./dashboard/components/ErrorBanner"
import { LoadingIndicator } from "./dashboard/components/LoadingIndicator"
import { FeaturedCard } from "./dashboard/components/FeaturedCard"
import { GameGrid } from "./dashboard/components/GameGrid"
import { EmptyState } from "./dashboard/components/EmptyState"
import { OnboardingModal } from "./dashboard/components/OnboardingModal"

export default function Dashboard() {
  const {
    authCode, setAuthCode,
    games, featured, setFeatured,
    loading, error, loadingGame,
    fetchLibrary, others,
  } = useLibrary()

  const [showOnboarding, setShowOnboarding] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    try {
      if (!localStorage.getItem(ONBOARDING_KEY)) setShowOnboarding(true)
    } catch {
      setShowOnboarding(true)
    }
  }, [])

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}

      <div style={{
        minHeight: "100vh",
        background: colors.bgBase,
        position: "relative",
        overflow: "hidden",
        fontFamily: fonts.brand,
      }}>
        <Background />

        <div style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "20px 14px" : "32px 24px",
        }}>
          <Header
            authCode={authCode}
            setAuthCode={setAuthCode}
            loading={loading}
            onFetch={fetchLibrary}
            onShowOnboarding={() => setShowOnboarding(true)}
          />

          {games.length > 0 && <LibraryCounter count={games.length} loadingGame={loadingGame} />}

          {error && <ErrorBanner message={error} />}

          {loadingGame && <LoadingIndicator name={loadingGame} />}

          {featured && (
            <div style={{ marginBottom: 32 }}>
              <FeaturedCard game={featured} />
            </div>
          )}

          {others.length > 0 && <GameGrid games={others} onSelect={setFeatured} />}

          {!loading && games.length === 0 && !error && <EmptyState />}
        </div>
      </div>
    </>
  )
}
