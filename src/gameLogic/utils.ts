export function getRandNumber(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min) + min)
}

export function fieldIndexToCoords(index: number, width: number) {
  return {
    Y: Math.floor(index / width),
    X: index % width,
  }
}

export function countOpenedCells(isOpenedMatrix: boolean[][]) {
  return isOpenedMatrix.reduce(
    (buff, row) => buff + row.reduce((buffrow, cell) => buffrow + +cell, 0),
    0
  )
}

export function createMatrixWithValue<Type>(
  value: Type,
  width: number,
  height: number
): Type[][] {
  return Array(height)
    .fill(null)
    .map(() => Array(width).fill(value))
}

export function checkForVictory(
  openedCount: number,
  markedCount: number,
  numberOfCells: number,
  numberOfMines: number
) {
  if (
    openedCount === numberOfCells - numberOfMines &&
    markedCount >= numberOfMines
  ) {
    return 3
  }
  return 1
}

export function checkForGameOver(status: string) {
  if (status === "2") return "GAME OVER"
  if (status === "3") return "WIN"
  return ""
}
