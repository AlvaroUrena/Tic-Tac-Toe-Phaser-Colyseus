import { ArraySchema } from '@colyseus/schema'

export enum Cell {
  Empty,
  X,
  O
}

interface ITicTacToeState {
  board: ArraySchema<Cell>

  activePlayer: number
}

export default ITicTacToeState
