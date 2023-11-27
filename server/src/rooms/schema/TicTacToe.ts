import { Schema, ArraySchema, type } from '@colyseus/schema'
import ITicTacToeState from '@shared/interfaces/ITicTacToeState'

export class TicTacToeState extends Schema implements ITicTacToeState {
  @type(['number'])
  board: ArraySchema<number>

  @type('number')
  activePlayer = 0

  constructor(){
    super()

    this.board = new ArraySchema<number>(
      0,0,0,
      0,0,0,
      0,0,0
    )
  }
}
