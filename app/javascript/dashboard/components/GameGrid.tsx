import React from "react"
import { Game } from "../types"
import { MiniCard } from "./MiniCard"

interface Props {
  games: Game[]
  onSelect: (game: Game) => void
}

export const GameGrid = ({ games, onSelect }: Props) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: 14,
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
