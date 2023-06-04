import { fieldIndexToCoords, getRandNumber } from "./utils"

function checkMineInArea(
  playerX: number,
  playerY: number,
  mineX: number,
  mineY: number
) {
  return Math.abs(playerX - mineX) < 2 && Math.abs(playerY - mineY) < 2
}

export function getMines(
  rowIndex: number,
  colIndex: number,
  width: number,
  height: number,
  mines: number
) {
  const minesPositions: number[] = []
  for (let i = 0; i < mines; i++) {
    while (true) {
      const newIndex = getRandNumber(0, width * height - 1)
      const { Y: mineY, X: mineX } = fieldIndexToCoords(newIndex, width)
      if (
        !minesPositions.includes(newIndex) &&
        !checkMineInArea(colIndex, rowIndex, mineX, mineY)
      ) {
        minesPositions.push(newIndex)
        break
      }
    }
  }
  return minesPositions
}

export function generateFieldMatrix(
  fieldHeight: number,
  fieldWidth: number,
  mines: number[]
) {
  const field = Array(fieldHeight)
    .fill(null)
    .map(() => Array(fieldWidth).fill(0))
  mines.forEach((mineIndex) => {
    const { Y: mineY, X: mineX } = fieldIndexToCoords(mineIndex, fieldWidth)
    field[mineY][mineX] = -1
    for (let y = mineY - 1; y < mineY + 2; y++) {
      for (let x = mineX - 1; x < mineX + 2; x++) {
        if (
          x >= 0 &&
          x < fieldWidth &&
          y >= 0 &&
          y < fieldHeight &&
          field[y][x] !== -1
        ) {
          field[y][x]++
        }
      }
    }
  })
  return field
}
