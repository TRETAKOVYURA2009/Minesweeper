import React from "react"
import { useNavigate } from "react-router-dom"
import PageLinks from "../types/pages"
import Button from "../components/ui/Button"

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center h-screen bg-homePage">
      <ul className="mt-28 text-center">
        <li>
          <h1 className="text-4xl balans">MineSweeper</h1>
        </li>
        <li>
          <h3 className="text-2xl space-y-4 mont">Choose level</h3>
        </li>
        <li className="flex justify-center">
          <div className="space-y-4 w-36">
            <div>
              <Button
                colour="green"
                onClick={() => navigate(PageLinks.easyLevel)}
              >
                Easy
              </Button>
            </div>
            <div>
              <Button
                colour="blue"
                onClick={() => navigate(PageLinks.normalLevel)}
              >
                Normal
              </Button>
            </div>
            <div>
              <Button
                colour="red"
                onClick={() => navigate(PageLinks.hardLevel)}
              >
                Hard
              </Button>
            </div>
            <div>
              <Button
                colour="yellow"
                onClick={() => navigate(PageLinks.customLevel)}
              >
                <b>Custom</b>
              </Button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
