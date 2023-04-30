import React from "react"
import Field from "./components/Field"

const App: React.FC = () => (
  <div className="App">
    Minesweeper
    <Field
      field={[
        [0, 0],
        [0, 0],
      ]}
    />
  </div>
)

export default App
