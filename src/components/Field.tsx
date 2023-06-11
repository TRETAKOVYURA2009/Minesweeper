import React from "react"
import Cell from "./Cell"
import GameStatus from "../types/game"

interface FieldProps {
  status: GameStatus
  field: number[][]
  isOpenedMatrix: boolean[][]
  isMarkedMatrix: boolean[][]
  onCellOpen: (rowIndex: number, colIndex: number) => void
  onNearbyOpen: (rowIndex: number, colIned: number) => void
  onCellMark: (rowIndex: number, colIndex: number) => void
}

const Field: React.FC<FieldProps> = ({
  status,
  field,
  isOpenedMatrix,
  isMarkedMatrix,
  onCellOpen,
  onNearbyOpen,
  onCellMark,
}) => {
  const handleCellClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rIndex: number,
    cIndex: number
  ) => {
    if (event.nativeEvent.button === 0) {
      if (!isOpenedMatrix[rIndex][cIndex] && !isMarkedMatrix[rIndex][cIndex]) {
        onCellOpen(rIndex, cIndex)
      } else if (
        isOpenedMatrix[rIndex][cIndex] &&
        !isMarkedMatrix[rIndex][cIndex] &&
        field[rIndex][cIndex] > 0
      ) {
        onNearbyOpen(rIndex, cIndex)
      }
    } else if (
      event.nativeEvent.button === 2 &&
      !isOpenedMatrix[rIndex][cIndex] &&
      (status === 0 || status === 1)
    ) {
      onCellMark(rIndex, cIndex)
    }
    event.preventDefault()
  }

  return (
    <div
      className="flex flex-col border-2 border-black w-fit rounded-md"
      id="field"
    >
      {field.map((row, rIndex) => (
        <div className="flex">
          {row.map((value, cIndex) => (
            <Cell
              value={value}
              isOpened={isOpenedMatrix[rIndex][cIndex]}
              isMarked={isMarkedMatrix[rIndex][cIndex]}
              isExplosion={field[rIndex][cIndex] === -2}
              onClick={(event) => handleCellClick(event, rIndex, cIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Field
