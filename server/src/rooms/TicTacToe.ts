import { Room, Client } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import { TicTacToeState } from './schema/TicTacToe'
import Message from '@shared/enums/Messages'
import PlayerSelectionCommand from 'src/commands/PlayerSelectionCommand'
import Payload from '@shared/payloads/PlayerSelectionPayload'

export class TicTacToe extends Room<TicTacToeState> {
  private dispatcher = new Dispatcher(this)

  onCreate() {
    this.setState(new TicTacToeState())
    this.onMessage(
      Message.PlayerSelection,
      (client, message: Pick<Payload, 'index'>) => {
        this.dispatcher.dispatch(new PlayerSelectionCommand(), {
          client,
          index: message.index
        })
      }
    )
  }

  // onJoin(client: Client) {
  //   this.clients
  // }

  onDispose() {
    this.dispatcher.stop()
  }
}
