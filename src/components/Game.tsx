import React, { useState } from "react"
import Field from "./Field"
import logic from "../gameLogic"
import GameStatus from "../types/game"

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
  const [isOpenedMatrix, setIsOpenedMatrix] = useState(
    logic.createMatrixWithValue(false, fieldWidth, fieldHeight)
  )
  const [isMarkedMatrix, setIsMarkedMatrix] = useState<boolean[][]>(
    logic.createMatrixWithValue(false, fieldWidth, fieldHeight)
  )
  const [field, setField] = useState<number[][]>(
    logic.createMatrixWithValue(0, fieldWidth, fieldHeight)
  )
  const [openedCount, setOpenedCount] = useState<number>(0)
  const [markedCount, setMarkedCount] = useState<number>(0)
  const [status, setStatus] = useState<GameStatus>(GameStatus.notStarted)

  const openCell = (rowIndex: number, colIndex: number, fIeld: number[][]) => {
    if (field[rowIndex][colIndex] === -1) {
      setStatus(GameStatus.gameOver)
      setIsOpenedMatrix(
        logic.createMatrixWithValue(true, fieldWidth, fieldHeight)
      )
      const newField = [...field]
      newField[rowIndex][colIndex] = -2
      setField(newField)
    } else {
      const newIsOpenedMatrix = logic.getOpenedCellNewMatrix(
        isOpenedMatrix,
        fIeld,
        colIndex,
        rowIndex
      )
      setIsOpenedMatrix(newIsOpenedMatrix)
      setOpenedCount(logic.countOpenedCells(isOpenedMatrix))
    }
  }

  const generateField = (rowIndex: number, colIndex: number) => {
    const mines = logic.getMines(
      rowIndex,
      colIndex,
      fieldWidth,
      fieldHeight,
      countOfMines
    )
    const newField = logic.generateFieldMatrix(fieldHeight, fieldWidth, mines)
    setField(newField)
    openCell(rowIndex, colIndex, newField)
    setStatus(GameStatus.started)
  }

  const cellOpenHandler = (rowIndex: number, colIndex: number) => {
    if (status === GameStatus.notStarted) {
      generateField(rowIndex, colIndex)
    } else if (status === GameStatus.started) {
      openCell(rowIndex, colIndex, field)
    }
  }

  return (
    <div className="flex justify-center">
      {JSON.stringify(openedCount)}
      {JSON.stringify(`flag: ${markedCount}`)}
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
          setMarkedCount(
            isMarkedMatrix[rowIndex][colIndex]
              ? markedCount + 1
              : markedCount - 1
          )
        }}
      />
    </div>
  )
}

export default Game
