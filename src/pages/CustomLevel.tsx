import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Game from "../components/Game"
import PageLinks from "../types/pages"
import Button from "../components/ui/Button"
import { ReactComponent as BackIcon } from "../icons/backIcon.svg"
import Input from "../components/ui/Input"

export const CustomLevel: React.FC = () => {
  const navigate = useNavigate()
  const [fieldWidth, setFieldWidth] = useState(8)
  const [fieldHeight, setFieldHeight] = useState(8)
  const [countOfMines, setCountOfMines] = useState(10)
  return (
    <div className="pt-2 pl-2">
      <div className="w-28">
        <Button colour="pink" onClick={() => navigate(PageLinks.home)}>
          <div>
            <BackIcon className="w-8 h-7 mx-3" />
          </div>
        </Button>
      </div>
      <div className="flex gap-4 w-full justify-center">
        <div className="w-32 h-20 relative">
          <Input
            value={fieldWidth.toString()}
            onChange={(value) => setFieldWidth(parseInt(value, 10) || 0)}
            type="number"
            label="Width"
            min={4}
          />
        </div>
        <div className="w-32 h-20 relative">
          <Input
            value={fieldHeight.toString()}
            onChange={(value) => setFieldHeight(parseInt(value, 10) || 0)}
            type="number"
            label="Height"
            min={4}
          />
        </div>
        <div className="w-32 h-20 relative">
          <Input
            value={countOfMines.toString()}
            onChange={(value) => setCountOfMines(parseInt(value, 10) || 0)}
            type="number"
            label="Count Of Mines"
            min={1}
            max={fieldWidth * fieldHeight - 9}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ul>
          <h1 className="text-center text-2xl balans">MineSweeper</h1>
          <h3 className="text-center text-xl mont">Custom level</h3>
          <Game
            fieldWidth={fieldWidth}
            fieldHeight={fieldHeight}
            countOfMines={countOfMines}
          />
        </ul>
      </div>
    </div>
  )
}
