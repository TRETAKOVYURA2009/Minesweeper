import React, { useState } from "react"
import Field from "./Field"
import { getMines } from "./utils"

interface GameProps {
  fieldWidth: number
  fieldHeight: number
  countOfMines: number
}

const Game: React.FC<GameProps> = ({
  fieldWidth,
  fieldHeight,
  countOfMines,
}) => {
  const [isOpenedMatrix, setIsOpenedMatrix] = useState<boolean[][]>(
    Array(fieldHeight)
      .fill(null)
      .map(() => Array(fieldWidth).fill(false))
  )
  const [isMarkedMatrix, setIsMarkedMatrix] = useState<boolean[][]>(
    Array(fieldHeight)
      .fill(null)
      .map(() => Array(fieldWidth).fill(false))
  )
  const [field, setField] = useState<number[][]>(
    Array(fieldHeight)
      .fill(null)
      .map(() => Array(fieldWidth).fill(0))
  )
  const [openedCount, setOpenedCount] = useState<number>(0)

  const openCell = (rowIndex: number, colIndex: number) => {
    const newIsOpenedMatrix = [...isOpenedMatrix]
    newIsOpenedMatrix[rowIndex][colIndex] = true
    setIsOpenedMatrix(newIsOpenedMatrix)
    setOpenedCount(openedCount + 1)
  }

  const generateField = (rowIndex: number, colIndex: number) => {
    const mines = getMines(
      rowIndex,
      colIndex,
      fieldWidth,
      fieldHeight,
      countOfMines
    )
    console.log("mines", mines)
    openCell(rowIndex, colIndex)
  }

  const cellOpenHandler = (rowIndex: number, colIndex: number) => {
    if (!openedCount) {
      generateField(rowIndex, colIndex)
    } else {
      openCell(rowIndex, colIndex)
    }
  }

  return (
    <div className="flex justify-center">
      {JSON.stringify(openedCount)}
      <Field
        field={field}
        isOpenedMatrix={isOpenedMatrix}
        isMarkedMatrix={isMarkedMatrix}
        onCellOpen={cellOpenHandler}
        onCellMark={(rowIndex, colIndex) => {
          const newIsMarkedMatrix = [...isMarkedMatrix]
          newIsMarkedMatrix[rowIndex][colIndex] =
            !newIsMarkedMatrix[rowIndex][colIndex]
          setIsMarkedMatrix(newIsMarkedMatrix)
        }}
      />
    </div>
  )
}

export default Game
