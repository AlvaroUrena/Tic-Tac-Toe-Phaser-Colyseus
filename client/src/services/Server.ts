import { Client } from 'colyseus.js'
import Phaser from 'phaser'
import ITicTacToeState from '@shared/interfaces/ITicTacToeState'
import Game from 'src/scenes/Game'

export default class Server {
  private client: Client
  private events: Phaser.Events.EventEmitter

  constructor() {
    this.client = new Client('ws://localhost:2567')
    this.events = new Phaser.Events.EventEmitter()
  }

  async join() {
    try {
      const room = await this.client.joinOrCreate<ITicTacToeState>(
        'tic-tac-toe'
      )

      room.onStateChange.once(state => {
        this.events.emit('on-state-changed', state)
      })
    } catch (e) {
      console.error(e)
    }
  }

  onceStateChanged(callback: (state: ITicTacToeState) => void, context?: Game) {
    this.events.once('on-state-changed', callback, context)
  }
}
