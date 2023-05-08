import React from "react"
import Cell from "./Cell"

interface FieldProps {
  field: number[][]
  isOpenedMatrix: boolean[][]
  isMarkedMatrix: boolean[][]
  onCellOpen: (rowIndex: number, colIndex: number) => void
  onCellMark: (rowIndex: number, colIndex: number) => void
}

const Field: React.FC<FieldProps> = ({
  field,
  isOpenedMatrix,
  isMarkedMatrix,
  onCellOpen,
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
      }
    } else if (event.nativeEvent.button === 2) {
      onCellMark(rIndex, cIndex)
    }
    event.preventDefault()
  }

  return (
    <div className="flex flex-col border-2 border-neutral-400 w-fit">
      {field.map((row, rIndex) => (
        <div className="flex">
          {row.map((value, cIndex) => (
            <Cell
              value={value}
              isOpened={isOpenedMatrix[rIndex][cIndex]}
              isMarked={isMarkedMatrix[rIndex][cIndex]}
              onClick={(event) => handleCellClick(event, rIndex, cIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Field
