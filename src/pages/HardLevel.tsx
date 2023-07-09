import React from "react"
import { useNavigate } from "react-router-dom"
import Game from "../components/Game"
import PageLinks from "../types/pages"
import Button from "../components/ui/Button"
import { ReactComponent as BackIcon } from "../icons/backIcon.svg"

export const HardLevel: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="pt-2 pl-2 h-screen">
      <div className="w-28">
        <Button colour="pink" onClick={() => navigate(PageLinks.home)}>
          <div>
            <BackIcon className="w-8 h-7 mx-3" />
          </div>
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <ul>
          <h1 className="text-center text-2xl balans">MineSweeper</h1>
          <h3 className="text-center text-xl mont">Hard level</h3>
          <Game fieldWidth={30} fieldHeight={16} countOfMines={99} />
        </ul>
      </div>
    </div>
  )
}
