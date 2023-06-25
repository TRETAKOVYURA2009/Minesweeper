import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Game from "../components/Game"
import PageLinks from "../types/pages"
import Button from "../components/ui/Button"
import { ReactComponent as BackIcon } from "../icons/backIcon.svg"

export const NormalLevel: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="mt-2">
      <Button colour="pink" onClick={() => navigate(PageLinks.home)}>
        <div>
          <BackIcon className="w-8 h-7 mx-3" />
        </div>
      </Button>
      <h1 className="text-center text-2xl">MineSweeper</h1>
      <h3 className="text-center text-xl">Normal level</h3>
      <Game fieldWidth={16} fieldHeight={16} countOfMines={40} />
    </div>
  )
}
