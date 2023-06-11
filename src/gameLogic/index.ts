import getOpenedCellNewMatrix from "./getOpenedCellNewMatrix"
import getNearbyOpenedCellsNewMatrix from "./getNearbyOpenedCellsNewMatrix"
import { generateFieldMatrix, getMines } from "./generateField"
import {
  createMatrixWithValue,
  countOpenedCells,
  checkForVictory,
  checkForGameOver,
} from "./utils"

export default {
  getOpenedCellNewMatrix,
  getNearbyOpenedCellsNewMatrix,
  generateFieldMatrix,
  getMines,
  createMatrixWithValue,
  countOpenedCells,
  checkForVictory,
  checkForGameOver,
}
