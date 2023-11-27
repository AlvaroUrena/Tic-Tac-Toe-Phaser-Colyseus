import { Command } from '@colyseus/command'
import { TicTacToe } from 'src/rooms/TicTacToe'
import Payload from '@shared/payloads/PlayerSelectionPayload'
import { Cell } from '@shared/interfaces/ITicTacToeState'

export default class PlayerSelectionCommand extends Command<
  TicTacToe,
  Payload
> {
  execute(data: Payload) {
    const { client, index } = data

    const clientIndex = this.room.clients.findIndex(c => c.id === client.id)
    const cellValue = clientIndex === 0 ? Cell.X : Cell.O

    this.room.state.board[index] = cellValue
  }
}
