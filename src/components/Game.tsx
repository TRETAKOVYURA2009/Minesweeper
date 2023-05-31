import React, { useState } from "react"
import Field from "./Field"
import { generateFieldMatrix, getMines, getOpenedCellNewMatrix } from "./utils"

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
  const [markedCount, setMarkedCount] = useState<number>(0)
  const [visitedCells, setVisitedCells] = useState<Set<unknown>>(new Set())
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  const openCell = (rowIndex: number, colIndex: number, fIeld: number[][]) => {
    if (field[rowIndex][colIndex] === -1) {
      setIsGameOver(true)
      setIsOpenedMatrix(
        Array(fieldHeight)
          .fill(null)
          .map(() => Array(fieldWidth).fill(true))
      )
      const newField = [...field]
      newField[rowIndex][colIndex] = -2
      setField(newField)
    } else {
      const {
        matrix: newIsOpenedMatrix,
        count: newOpenedCount,
        visited: newVisetedCells,
      } = getOpenedCellNewMatrix(
        isOpenedMatrix,
        fIeld,
        colIndex,
        rowIndex,
        openedCount,
        visitedCells
      )
      setIsOpenedMatrix(newIsOpenedMatrix)
      setOpenedCount(newOpenedCount)
      setVisitedCells(newVisetedCells)
    }
  }

  const generateField = (rowIndex: number, colIndex: number) => {
    const mines = getMines(
      rowIndex,
      colIndex,
      fieldWidth,
      fieldHeight,
      countOfMines
    )
    const newField = generateFieldMatrix(fieldHeight, fieldWidth, mines)
    console.log("mines", mines)
    setField(newField)
    openCell(rowIndex, colIndex, newField)
  }

  const cellOpenHandler = (rowIndex: number, colIndex: number) => {
    if (!openedCount) {
      generateField(rowIndex, colIndex)
    } else {
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
