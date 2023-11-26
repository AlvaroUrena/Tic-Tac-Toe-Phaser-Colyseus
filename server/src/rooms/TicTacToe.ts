import { Room, Client } from 'colyseus'
import { TicTacToeState } from './schema/TicTacToe'

export class TicTacToe extends Room<TicTacToeState> {
  onCreate() {
    this.setState(new TicTacToeState())
    this.onMessage('keydown', (client, message) => {
      this.broadcast('keydown', message, {
        except: client
      })
    })
  }

  onJoin(client: Client, options: any) {}

  onLeave(client: Client, consented: boolean) {}

  onDispose() {}
}
