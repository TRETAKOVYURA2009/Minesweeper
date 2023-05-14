import React, { useState } from "react"
import Field from "./components/Field"

const App: React.FC = () => {
  const fieldWidth = 4
  const fieldHeidth = 4
  const [isOpenedMatrix, setIsOpenedMatrix] = useState<boolean[][]>(
    Array(fieldHeidth)
      .fill(null)
      .map(() => Array(fieldWidth).fill(false))
  )
  const [isMarkedMatrix, setIsMarkedMatrix] = useState<boolean[][]>(
    Array(fieldHeidth)
      .fill(null)
      .map(() => Array(fieldWidth).fill(false))
  )
  return (
    <div>
      <h1 className="text-center">Minesweeper</h1>
      <div className="flex justify-center">
        <Field
          field={[
            [-1, 1, 0, 0],
            [1, 2, 1, 1],
            [0, 1, -1, 1],
            [0, 1, 1, 1],
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
