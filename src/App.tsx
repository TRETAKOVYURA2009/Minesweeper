import React, { useState } from "react"
import Field from "./components/Field"
import Game from "./components/Game"

const App: React.FC = () => (
  <div>
    <h1 className="text-center">Minesweeper</h1>
    <Game fieldWidth={4} fieldHeight={4} countOfMines={3} />
  </div>
)

export default App
