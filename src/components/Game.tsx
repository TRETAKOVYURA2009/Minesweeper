import React, { useState } from "react"
import Field from "./Field"
import logic from "../gameLogic"
import GameStatus from "../types/game"
import Button from "./ui/Button"

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

  const setGameOver = (rowIndex: number, colIndex: number) => {
    setStatus(GameStatus.gameOver)
    setIsOpenedMatrix(
      logic.createMatrixWithValue(true, fieldWidth, fieldHeight)
    )
    const newField = [...field]
    newField[rowIndex][colIndex] = -2
    setField(newField)
  }

  const openCell = (rowIndex: number, colIndex: number, fIeld: number[][]) => {
    if (field[rowIndex][colIndex] === -1) {
      setGameOver(rowIndex, colIndex)
    } else {
      const newIsOpenedMatrix = logic.getOpenedCellNewMatrix(
        isOpenedMatrix,
        fIeld,
        colIndex,
        rowIndex
      )
      const newOpenedCount = logic.countOpenedCells(isOpenedMatrix)
      setIsOpenedMatrix(newIsOpenedMatrix)
      setOpenedCount(newOpenedCount)
      setStatus(
        logic.checkForVictory(
          newOpenedCount,
          markedCount,
          fieldHeight * fieldWidth,
          countOfMines
        )
      )
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
    setIsMarkedMatrix(
      logic.createMatrixWithValue(false, fieldWidth, fieldHeight)
    )
  }

  const cellOpenHandler = (rowIndex: number, colIndex: number) => {
    if (status === GameStatus.notStarted) {
      generateField(rowIndex, colIndex)
    } else if (status === GameStatus.started) {
      openCell(rowIndex, colIndex, field)
    }
  }

  const nearbyOpenHandler = (rowIndex: number, colIndex: number) => {
    if (status === GameStatus.started) {
      const result = logic.getNearbyOpenedCellsNewMatrix(
        isOpenedMatrix,
        isMarkedMatrix,
        field,
        colIndex,
        rowIndex
      )
      setIsOpenedMatrix(result.newIsOpenedMatrix)
      if (!result.isSuccess) {
        setGameOver(result.mine!.y, result.mine!.x)
      }
    }
  }

  const restartGame = () => {
    setField(logic.createMatrixWithValue(0, fieldWidth, fieldHeight))
    setIsOpenedMatrix(
      logic.createMatrixWithValue(false, fieldWidth, fieldHeight)
    )
    setIsMarkedMatrix(
      logic.createMatrixWithValue(false, fieldWidth, fieldHeight)
    )
    setOpenedCount(0)
    setMarkedCount(0)
    setStatus(GameStatus.notStarted)
  }

  return (
    <div className="flex justify-center">
      <div>
        <h1
          className={`text-center ${
            status === 3 ? "win text-lg mb-1" : "game-over mb-2"
          }`}
        >
          {logic.checkForGameOver(`${status}`)}
        </h1>
        <Field
          status={status}
          field={field}
          isOpenedMatrix={isOpenedMatrix}
          isMarkedMatrix={isMarkedMatrix}
          onCellOpen={cellOpenHandler}
          onNearbyOpen={nearbyOpenHandler}
          onCellMark={(rowIndex, colIndex) => {
            const newIsMarkedMatrix = [...isMarkedMatrix]
            newIsMarkedMatrix[rowIndex][colIndex] =
              !newIsMarkedMatrix[rowIndex][colIndex]
            setIsMarkedMatrix(newIsMarkedMatrix)
            if (status === 1) {
              const newMarkedCount = isMarkedMatrix[rowIndex][colIndex]
                ? markedCount + 1
                : markedCount - 1
              setMarkedCount(newMarkedCount)
              setStatus(
                logic.checkForVictory(
                  openedCount,
                  newMarkedCount,
                  fieldHeight * fieldWidth,
                  countOfMines
                )
              )
            }
          }}
        />
        <div className="mt-4 text-center">
          <Button onClick={restartGame}> Restart </Button>
        </div>
      </div>
    </div>
  )
}

export default Game
