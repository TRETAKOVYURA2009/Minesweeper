import React from "react"
import { useNavigate } from "react-router-dom"
import Game from "../components/Game"
import PageLinks from "../types/pages"
import Button from "../components/ui/Button"
import { ReactComponent as BackIcon } from "../icons/backIcon.svg"

export const EasyLevel: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-easy min-h-screen">
      <div className="ml-2 mt-2 w-28">
        <Button colour="pink" onClick={() => navigate(PageLinks.home)}>
          <div>
            <BackIcon className="w-8 h-7 mx-3" />
          </div>
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <ul>
          <h1 className="text-center text-2xl balans">MineSweeper</h1>
          <h3 className="text-center text-xl mont">Easy level</h3>
          <Game fieldWidth={8} fieldHeight={8} countOfMines={10} />
        </ul>
      </div>
    </div>
  )
}
