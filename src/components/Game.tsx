import React, { useMemo, useState } from "react"
import Field from "./Field"
import logic from "../gameLogic"
import { GameStatus, FieldParams } from "../types/game"
import Button from "./ui/Button"
import StopWatch from "./StopWatch"

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
  const [fieldParams, setFieldParams] = useState<FieldParams>({
    width: fieldWidth,
    height: fieldHeight,
    countOfMines,
  })
  const [isOpenedMatrix, setIsOpenedMatrix] = useState(
    logic.createMatrixWithValue(false, fieldParams.width, fieldParams.height)
  )
  const [isMarkedMatrix, setIsMarkedMatrix] = useState<boolean[][]>(
    logic.createMatrixWithValue(false, fieldParams.width, fieldParams.height)
  )
  const [field, setField] = useState<number[][]>(
    logic.createMatrixWithValue(0, fieldParams.width, fieldParams.height)
  )
  const [openedCount, setOpenedCount] = useState<number>(0)
  const [markedCount, setMarkedCount] = useState<number>(0)
  const [status, setStatus] = useState<GameStatus>(GameStatus.notStarted)

  const setGameOver = (rowIndex: number, colIndex: number) => {
    setStatus(GameStatus.gameOver)
    setIsOpenedMatrix(
      logic.createMatrixWithValue(true, fieldParams.width, fieldParams.height)
    )
    const newField = [...field]
    newField[rowIndex][colIndex] = -2
    setField(newField)
  }

  const updateCounter = () => {
    const newOpenedCount = logic.countOpenedCells(isOpenedMatrix)
    setOpenedCount(newOpenedCount)
    setStatus(
      logic.checkForVictory(
        newOpenedCount,
        markedCount,
        fieldParams.height * fieldParams.width,
        fieldParams.countOfMines
      )
    )
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
      setIsOpenedMatrix(newIsOpenedMatrix)
      updateCounter()
    }
  }

  const generateField = (rowIndex: number, colIndex: number) => {
    const mines = logic.getMines(
      rowIndex,
      colIndex,
      fieldParams.width,
      fieldParams.height,
      fieldParams.countOfMines
    )
    const newField = logic.generateFieldMatrix(
      fieldParams.height,
      fieldParams.width,
      mines
    )
    setField(newField)
    openCell(rowIndex, colIndex, newField)
    setIsMarkedMatrix(
      logic.createMatrixWithValue(false, fieldParams.width, fieldParams.height)
    )
  }

  const cellMarkHandler = (rowIndex: number, colIndex: number) => {
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
          fieldParams.height * fieldParams.width,
          fieldParams.countOfMines
        )
      )
    }
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
      updateCounter()
    }
  }

  const restartGame = () => {
    setFieldParams({ width: fieldWidth, height: fieldHeight, countOfMines })
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

  const gameStatusLabel = useMemo(
    () => logic.checkForGameOver(status),
    [status]
  )

  return (
    <div className="flex items-center flex-col">
      <StopWatch status={status} />
      <h1
        className={`text-center ${
          status === 3 ? "win text-lg mb-1" : "game-over mb-2"
        }`}
      >
        {gameStatusLabel || <span>&nbsp;</span>}
      </h1>
      <Field
        status={status}
        field={field}
        isOpenedMatrix={isOpenedMatrix}
        isMarkedMatrix={isMarkedMatrix}
        onCellOpen={cellOpenHandler}
        onNearbyOpen={nearbyOpenHandler}
        onCellMark={cellMarkHandler}
      />
      <div className="my-4 text-center w-32">
        <Button colour="black" shape="rounded" onClick={restartGame}>
          Restart
        </Button>
      </div>
    </div>
  )
}

export default Game
