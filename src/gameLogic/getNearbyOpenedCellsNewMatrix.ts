import getOpenedCellNewMatrix from "./getOpenedCellNewMatrix"

type NearbyOpenResult = {
  isSuccess: boolean
  mine?: { x: number; y: number }
  newIsOpenedMatrix: boolean[][]
}

export default function getNearbyOpenedCellsNewMatrix(
  isOpenedMatrix: boolean[][],
  isMarkedMatrix: boolean[][],
  field: number[][],
  cellX: number,
  cellY: number
): NearbyOpenResult {
  let newIsOpenedMatrix = [...isOpenedMatrix]
  let markedAround = 0
  const width = field[0].length
  const height = field.length
  for (let y = cellY - 1; y < cellY + 2; y++) {
    for (let x = cellX - 1; x < cellX + 2; x++) {
      if (x >= 0 && x < width && y >= 0 && y < height && isMarkedMatrix[y][x]) {
        markedAround++
      }
    }
  }
  if (field[cellY][cellX] === markedAround) {
    for (let y = cellY - 1; y < cellY + 2; y++) {
      for (let x = cellX - 1; x < cellX + 2; x++) {
        if (
          x >= 0 &&
          x < width &&
          y >= 0 &&
          y < height &&
          !isMarkedMatrix[y][x] &&
          !newIsOpenedMatrix[y][x]
        ) {
          if (field[y][x] === -1) {
            return {
              isSuccess: false,
              mine: { x, y },
              newIsOpenedMatrix,
            }
          }
          newIsOpenedMatrix = getOpenedCellNewMatrix(
            newIsOpenedMatrix,
            field,
            x,
            y
          )
        }
      }
    }
  }
  return {
    isSuccess: true,
    newIsOpenedMatrix,
  }
}
