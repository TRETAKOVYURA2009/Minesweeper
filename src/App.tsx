import React, { useState } from "react"
import Field from "./components/Field"

const App: React.FC = () => {
  const [isOpenedMatrix, setIsOpenedMatrix] = useState<boolean[][]>([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ])
  const [isMarkedMatrix, setIsMarkedMatrix] = useState<boolean[][]>([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ])
  return (
    <div>
      <h1 className="text-center">Minesweeper</h1>
      <div className="flex justify-center">
        <Field
          field={[
            [-1, 1, 0],
            [1, 2, 1],
            [0, 1, -1],
          ]}
          isOpenedMatrix={isOpenedMatrix}
          isMarkedMatrix={isMarkedMatrix}
          onCellOpen={(rowIndex, colIndex) => {
            const newIsOpenedMatrix = [...isOpenedMatrix]
            newIsOpenedMatrix[rowIndex][colIndex] = true
            setIsOpenedMatrix(newIsOpenedMatrix)
          }}
          onCellMark={(rowIndex, colIndex) => {
            const newIsMarkedMatrix = [...isMarkedMatrix]
            newIsMarkedMatrix[rowIndex][colIndex] =
              !newIsMarkedMatrix[rowIndex][colIndex]
            setIsMarkedMatrix(newIsMarkedMatrix)
          }}
        />
      </div>
    </div>
  )
}

export default App
