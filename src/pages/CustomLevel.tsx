import React, { useState } from "react"
import { Link } from "react-router-dom"
import Game from "../components/Game"
import PageLinks from "../types/pages"
import Input from "../components/ui/Input"

export const CustomLevel: React.FC = () => {
  const [fieldWidth, setFieldWidth] = useState(8)
  const [fieldHeight, setFieldHeight] = useState(8)
  const [countOfMines, setCountOfMines] = useState(10)

  return (
    <div>
      <h1>MineSweeper</h1>
      <h3>Custom level</h3>
      <Link to={PageLinks.home}>Back to menu</Link>
      <div className="flex gap-4">
        <div className="w-32 h-20 relative">
          <Input
            value={fieldWidth.toString()}
            onChange={(value) => setFieldWidth(parseInt(value, 10) || 0)}
            type="number"
            label="Width"
          />
        </div>
        <div className="w-32 h-20 relative">
          <Input
            value={fieldHeight.toString()}
            onChange={(value) => setFieldHeight(parseInt(value, 10) || 0)}
            type="number"
            label="Height"
          />
        </div>
        <div className="w-32 h-20 relative">
          <Input
            value={countOfMines.toString()}
            onChange={(value) => setCountOfMines(parseInt(value, 10) || 0)}
            type="number"
            label="Count Of Mines"
          />
        </div>
      </div>
      <Game
        fieldWidth={fieldWidth}
        fieldHeight={fieldHeight}
        countOfMines={countOfMines}
      />
    </div>
  )
}
