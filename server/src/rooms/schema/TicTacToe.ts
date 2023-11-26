import { Schema, type } from '@colyseus/schema'

export class TicTacToeState extends Schema {
  @type('string') name: string = 'ttt-state'
}
