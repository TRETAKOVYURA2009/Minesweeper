export function getRandNumber(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min) + min)
}

function fieldIndexToCoords(index: number, width: number) {
  return {
    Y: Math.floor(index / width),
    X: index % width,
  }
}

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

export function getOpenedCellNewMatrix(
  isOpenedMatrix: boolean[][],
  field: number[][],
  cellX: number,
  cellY: number,
  openedCount: number,
  visited: Set<unknown>
) {
  const newIsOpenedMatrix = [...isOpenedMatrix]
  let newOpendedCount = openedCount
  if (field[cellY][cellX] !== 0) {
    newIsOpenedMatrix[cellY][cellX] = true
    newOpendedCount++
    visited.add(`${cellX},${cellY}`)
    return {
      matrix: newIsOpenedMatrix,
      count: newOpendedCount,
      visited,
    }
  }
  const queue: { x: number; y: number }[] = [{ x: cellX, y: cellY }]
  visited.add(`${cellX},${cellY}`)
  newOpendedCount++
  const width = field[0].length
  const height = field.length
  while (queue.length) {
    const cell = queue.shift()!
    for (let y = cell.y - 1; y < cell.y + 2; y++) {
      for (let x = cell.x - 1; x < cell.x + 2; x++) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
          if (!field[y][x] && !visited.has(`${x},${y}`)) {
            queue.push({ x, y })
            newOpendedCount++
          } else if (!visited.has(`${x},${y}`)) {
            newOpendedCount++
          }
          newIsOpenedMatrix[y][x] = true
          visited.add(`${x},${y}`)
        }
      }
    }
  }
  return { matrix: isOpenedMatrix, count: newOpendedCount, visited }
}
