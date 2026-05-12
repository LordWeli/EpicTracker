import React, { useState, useEffect } from "react"

// ── Types ────────────────────────────────────────────────────────────────────
interface Game {
  name: string
  image_url: string | null
  release_year: number | null
  main_story: number | null
  main_extra: number | null
  completionist: number | null
  found: boolean
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (h: number | null) => {
  if (h === null) return "—"
  if (h >= 100) return `${Math.round(h)}h`
  const whole = Math.floor(h)
  const frac  = h - whole
  if (frac >= 0.75) return `${whole}¾h`
  if (frac >= 0.5)  return `${whole}½h`
  if (frac >= 0.25) return `${whole}¼h`
  return `${whole}h`
}

// ── Sub-components ───────────────────────────────────────────────────────────
const GlowOrb = ({ cx, cy, r, color }: { cx: string; cy: string; r: string; color: string }) => (
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

const TimeRow = ({ label, value }: { label: string; value: number | null }) => (
  <tr style={{ borderBottom: "1px solid rgba(167,139,250,0.1)" }}>
    <td style={{ padding: "10px 16px", color: "rgba(196,181,253,0.7)", fontSize: 13, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>
      {label}
    </td>
    <td style={{ padding: "10px 16px", textAlign: "right" }}>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 15,
        fontWeight: 600,
        color: value !== null ? "#e9d5ff" : "rgba(196,181,253,0.3)",
        letterSpacing: "0.05em",
      }}>
        {fmt(value)}
      </span>
    </td>
  </tr>
)

const FeaturedCard = ({ game }: { game: Game }) => (
  <div style={{
    display: "flex",
    gap: 0,
    background: "rgba(88,28,135,0.15)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(167,139,250,0.2)",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 0 60px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
    minHeight: 320,
  }}>
    <div style={{ position: "relative", width: 260, flexShrink: 0 }}>
      {game.image_url ? (
        <img
          src={game.image_url}
          alt={game.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div style={{
          width: "100%", height: "100%", minHeight: 320,
          background: "linear-gradient(135deg, rgba(88,28,135,0.4), rgba(49,10,101,0.6))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 48, opacity: 0.3 }}>🎮</span>
        </div>
      )}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, transparent 60%, rgba(13,5,21,0.8))",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "24px 20px 20px",
        background: "linear-gradient(to top, rgba(13,5,21,0.95) 0%, transparent 100%)",
      }}>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#f3e8ff",
          lineHeight: 1.2,
          marginBottom: 4,
        }}>
          {game.name}
        </div>
        {game.release_year && (
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(196,181,253,0.6)" }}>
            {game.release_year}
          </div>
        )}
      </div>
    </div>

    <div style={{ flex: 1, padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.2em",
        color: "rgba(167,139,250,0.5)",
        textTransform: "uppercase",
        marginBottom: 16,
      }}>
        Time to Beat
      </div>
      {game.found ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <TimeRow label="Main Story"    value={game.main_story} />
            <TimeRow label="Main + Extra"  value={game.main_extra} />
            <TimeRow label="Completionist" value={game.completionist} />
          </tbody>
        </table>
      ) : (
        <div style={{ color: "rgba(196,181,253,0.35)", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
          Not found on HowLongToBeat
        </div>
      )}
    </div>
  </div>
)

const MiniCard = ({ game, onClick, active }: { game: Game; onClick: () => void; active: boolean }) => (
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

// ── Onboarding Modal ─────────────────────────────────────────────────────────
const ONBOARDING_KEY = "epictracker.onboarded.v1"

const OnboardingModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0)

  const slides = [
    {
      badge: "STEP 01",
      title: "Get your auth code",
      body: (
        <>
          Click the{" "}
          <span style={{
            fontFamily: "'DM Mono', monospace",
            color: "#e9d5ff",
            background: "rgba(124,58,237,0.25)",
            border: "1px solid rgba(167,139,250,0.3)",
            borderRadius: 6,
            padding: "2px 8px",
            fontSize: 12,
          }}>
            Get Auth Code ↗
          </span>{" "}
          button at the top right. A new tab will open with a JSON response from Epic Games. Copy the value of the{" "}
          <span style={{
            fontFamily: "'DM Mono', monospace",
            color: "#f0abfc",
          }}>
            authorizationCode
          </span>{" "}
          field.
        </>
      ),
      icon: "🔑",
    },
    {
      badge: "STEP 02",
      title: "Fetch your library",
      body: (
        <>
          Paste the code into the{" "}
          <span style={{
            fontFamily: "'DM Mono', monospace",
            color: "#e9d5ff",
            background: "rgba(124,58,237,0.25)",
            border: "1px solid rgba(167,139,250,0.3)",
            borderRadius: 6,
            padding: "2px 8px",
            fontSize: 12,
          }}>
            Paste your auth_code…
          </span>{" "}
          input, then click{" "}
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            color: "#f3e8ff",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            borderRadius: 6,
            padding: "2px 10px",
            fontSize: 12,
            letterSpacing: "0.05em",
          }}>
            Fetch
          </span>
          . EpicTracker will load your games and match them against HowLongToBeat.
        </>
      ),
      icon: "📚",
    },
  ]

  const current = slides[step]
  const isLast = step === slides.length - 1

  const finish = () => {
    try { localStorage.setItem(ONBOARDING_KEY, "1") } catch {}
    onClose()
  }

  return (
    <div
      onClick={finish}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(13,5,21,0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "fadeIn 0.25s ease",
      }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 540,
          background: "rgba(88,28,135,0.18)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(167,139,250,0.25)",
          borderRadius: 24,
          boxShadow: "0 0 80px rgba(124,58,237,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}
      >
        <button
          onClick={finish}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "transparent",
            border: "none",
            color: "rgba(196,181,253,0.5)",
            fontSize: 20,
            cursor: "pointer",
            width: 32,
            height: 32,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            zIndex: 1,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "#e9d5ff"
            e.currentTarget.style.background = "rgba(167,139,250,0.1)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "rgba(196,181,253,0.5)"
            e.currentTarget.style.background = "transparent"
          }}
        >
          ×
        </button>

        <div style={{ padding: "44px 40px 32px" }}>
          <div style={{ fontSize: 48, marginBottom: 20, textAlign: "center" }}>
            {current.icon}
          </div>

          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: "rgba(167,139,250,0.6)",
            textTransform: "uppercase",
            marginBottom: 12,
            textAlign: "center",
          }}>
            {current.badge}
          </div>

          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            background: "linear-gradient(135deg, #e9d5ff, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 18,
            textAlign: "center",
            letterSpacing: "0.02em",
          }}>
            {current.title}
          </div>

          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
            lineHeight: 1.7,
            color: "rgba(196,181,253,0.8)",
            textAlign: "center",
            minHeight: 110,
          }}>
            {current.body}
          </div>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 28px 28px",
          gap: 16,
        }}>
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              background: "transparent",
              border: "1px solid rgba(167,139,250,0.2)",
              borderRadius: 10,
              padding: "10px 18px",
              color: step === 0 ? "rgba(196,181,253,0.25)" : "rgba(196,181,253,0.8)",
              fontFamily: "'Syne', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              cursor: step === 0 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              opacity: step === 0 ? 0.4 : 1,
            }}
          >
            ← BACK
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={`Go to step ${i + 1}`}
                style={{
                  width: i === step ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  background: i === step
                    ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                    : "rgba(167,139,250,0.25)",
                  boxShadow: i === step ? "0 0 12px rgba(124,58,237,0.5)" : "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => isLast ? finish() : setStep(s => s + 1)}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              border: "1px solid rgba(167,139,250,0.3)",
              borderRadius: 10,
              padding: "10px 22px",
              color: "#f3e8ff",
              fontFamily: "'Syne', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.1em",
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
              transition: "all 0.2s ease",
            }}
          >
            {isLast ? "GOT IT" : "NEXT →"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [authCode, setAuthCode]       = useState("")
  const [games, setGames]             = useState<Game[]>([])
  const [featured, setFeatured]       = useState<Game | null>(null)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState<string | null>(null)
  const [loadingGame, setLoadingGame] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(ONBOARDING_KEY)) setShowOnboarding(true)
    } catch {
      setShowOnboarding(true)
    }
  }, [])

  const fetchLibrary = async () => {
    if (!authCode.trim()) return
    setLoading(true)
    setError(null)
    setGames([])
    setFeatured(null)

    try {
      const res  = await fetch(`/epic_games/library?auth_code=${encodeURIComponent(authCode)}`)
      const data = await res.json()

      if (data.error) { setError(data.error); return }

      const names: string[] = (data.library || []).map((g: { name: string }) => g.name)
      if (!names.length) { setError("No games found."); return }

      const result: Game[] = []
      for (const name of names) {
        setLoadingGame(name)
        try {
          const r    = await fetch(`/howlongtobeat/game?name=${encodeURIComponent(name)}`)
          const d    = await r.json()
          const game: Game = d.error
            ? { name, image_url: null, release_year: null, main_story: null, main_extra: null, completionist: null, found: false }
            : { ...d.game, found: true }
          result.push(game)
          setGames([...result])
          if (result.length === 1) setFeatured(game)
        } catch {
          result.push({ name, image_url: null, release_year: null, main_story: null, main_extra: null, completionist: null, found: false })
          setGames([...result])
        }
      }
      setLoadingGame(null)
    } catch {
      setError("Failed to connect to server.")
    } finally {
      setLoading(false)
      setLoadingGame(null)
    }
  }

  const others = featured ? games.filter(g => g.name !== featured.name) : games

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}

      <div style={{
        minHeight: "100vh",
        background: "#0D0515",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Syne', sans-serif",
      }}>
        <GlowOrb cx="15%"  cy="20%"  r="500px" color="rgba(109,40,217,0.18)" />
        <GlowOrb cx="80%"  cy="60%"  r="400px" color="rgba(139,92,246,0.12)" />
        <GlowOrb cx="50%"  cy="90%"  r="300px" color="rgba(168,85,247,0.1)"  />

        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

          {/* ── Header ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "0.05em",
              background: "linear-gradient(135deg, #e9d5ff, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              EPIC<span style={{ fontWeight: 400 }}>TRACKER</span>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <a
                href="https://www.epicgames.com/id/api/redirect?clientId=34a02cf8f4414e29b15921876da36f9a&responseType=code"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: "rgba(196,181,253,0.5)",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  borderBottom: "1px solid rgba(196,181,253,0.2)",
                  paddingBottom: 1,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(196,181,253,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(196,181,253,0.5)")}
              >
                Get Auth Code ↗
              </a>
              <input
                type="text"
                placeholder="Paste your auth_code…"
                value={authCode}
                onChange={e => setAuthCode(e.target.value)}
                onKeyDown={e => e.key === "Enter" && fetchLibrary()}
                style={{
                  background: "rgba(88,28,135,0.15)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  borderRadius: 10,
                  padding: "10px 16px",
                  color: "#e9d5ff",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  width: 280,
                  outline: "none",
                  backdropFilter: "blur(12px)",
                }}
              />
              <button
                onClick={fetchLibrary}
                disabled={loading || !authCode.trim()}
                style={{
                  background: loading
                    ? "rgba(88,28,135,0.3)"
                    : "linear-gradient(135deg, #7c3aed, #a855f7)",
                  border: "1px solid rgba(167,139,250,0.3)",
                  borderRadius: 10,
                  padding: "10px 22px",
                  color: "#f3e8ff",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.05em",
                  boxShadow: loading ? "none" : "0 0 20px rgba(124,58,237,0.3)",
                  transition: "all 0.2s ease",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Loading…" : "Fetch"}
              </button>
            </div>
          </div>

          {/* ── Game counter ── */}
          {games.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                color: "rgba(196,181,253,0.4)",
                letterSpacing: "0.1em",
              }}>
                LIBRARY
              </span>
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#a855f7",
              }}>
                {games.length}
              </span>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                color: "rgba(196,181,253,0.4)",
                letterSpacing: "0.1em",
              }}>
                {loadingGame ? "GAMES LOADED" : "GAMES"}
              </span>
            </div>
          )}

          {/* ── Error ── */}
          {error && (
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
              {error}
            </div>
          )}

          {/* ── Loading indicator ── */}
          {loadingGame && (
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              marginBottom: 24,
              color: "rgba(196,181,253,0.6)",
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#a855f7",
                boxShadow: "0 0 8px #a855f7",
                animation: "pulse 1s infinite",
              }} />
              Fetching <span style={{ color: "#c4b5fd", marginLeft: 4 }}>{loadingGame}</span>…
              <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
            </div>
          )}

          {/* ── Featured ── */}
          {featured && (
            <div style={{ marginBottom: 32 }}>
              <FeaturedCard game={featured} />
            </div>
          )}

          {/* ── Grid ── */}
          {others.length > 0 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: 14,
            }}>
              {others.map(game => (
                <MiniCard
                  key={game.name}
                  game={game}
                  active={false}
                  onClick={() => setFeatured(game)}
                />
              ))}
            </div>
          )}

          {/* ── Empty state ── */}
          {!loading && games.length === 0 && !error && (
            <div style={{
              textAlign: "center",
              padding: "80px 0",
              color: "rgba(196,181,253,0.3)",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎮</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.1em" }}>
                ENTER YOUR AUTH CODE TO BEGIN
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}