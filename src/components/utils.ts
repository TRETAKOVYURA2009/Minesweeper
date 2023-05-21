export function getRandNumber(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min) + min)
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
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < mines; i++) {
    while (true) {
      const newIndex = getRandNumber(0, width * height - 1)
      const mineY = Math.floor(newIndex / width)
      const mineX = newIndex % width
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
