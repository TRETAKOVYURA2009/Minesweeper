// eslint-disable-next-line no-shadow
export enum GameStatus {
  notStarted,
  started,
  gameOver,
  finished,
}

export type FieldParams = {
  width: number
  height: number
  countOfMines: number
}
