export default function getOpenedCellNewMatrix(
  isOpenedMatrix: boolean[][],
  field: number[][],
  cellX: number,
  cellY: number
) {
  const newIsOpenedMatrix = [...isOpenedMatrix]
  if (field[cellY][cellX] !== 0) {
    newIsOpenedMatrix[cellY][cellX] = true
    return newIsOpenedMatrix
  }
  const queue: { x: number; y: number }[] = [{ x: cellX, y: cellY }]
  const visited = new Set()
  visited.add(`${cellX},${cellY}`)
  const width = field[0].length
  const height = field.length
  while (queue.length) {
    const cell = queue.shift()!
    for (let y = cell.y - 1; y < cell.y + 2; y++) {
      for (let x = cell.x - 1; x < cell.x + 2; x++) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
          if (!field[y][x] && !visited.has(`${x},${y}`)) {
            queue.push({ x, y })
          }
          newIsOpenedMatrix[y][x] = true
          visited.add(`${x},${y}`)
        }
      }
    }
  }
  return newIsOpenedMatrix
}
