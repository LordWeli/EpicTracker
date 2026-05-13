import React from "react"
import { Game } from "../types"
import { MiniCard } from "./MiniCard"
import { useIsMobile } from "../useIsMobile"

interface Props {
  games: Game[]
  onSelect: (game: Game) => void
}

export const GameGrid = ({ games, onSelect }: Props) => {
  const isMobile = useIsMobile()
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(auto-fill, minmax(100px, 1fr))"
        : "repeat(auto-fill, minmax(130px, 1fr))",
      gap: isMobile ? 10 : 14,
    }}>
      {games.map(game => (
        <MiniCard
          key={game.name}
          game={game}
          active={false}
          onClick={() => onSelect(game)}
        />
      ))}
    </div>
  )
}
