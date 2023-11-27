import { Client, Room } from 'colyseus.js'
import { Schema } from '@colyseus/schema'
import Phaser from 'phaser'
import ITicTacToeState from '@shared/interfaces/ITicTacToeState'
import Message from '@shared/enums/Messages'
import Game from 'src/scenes/Game'
import PlayerSelectionPayload from '@shared/payloads/PlayerSelectionPayload'

export default class Server {
  private client: Client
  private events: Phaser.Events.EventEmitter

  private room?: Room<ITicTacToeState & Schema>

  constructor() {
    this.client = new Client('ws://localhost:2567')
    this.events = new Phaser.Events.EventEmitter()
  }

  async join() {
    try {
      this.room = await this.client.joinOrCreate<ITicTacToeState & Schema>(
        'tic-tac-toe'
      )

      this.room.onStateChange.once(state => {
        this.events.emit('on-state-changed', state)
      })

      this.room.state.board.onChange(() => {
        this.events.emit('board-changed', this.room?.state.board)
      })
    } catch (e) {
      console.error(e)
    }
  }

  makeSelection(i: number) {
    if (!this.room) {
      return
    }
    const message: Omit<PlayerSelectionPayload, 'client'> = { index: i }
    this.room.send(Message.PlayerSelection, message)
  }

  onceStateChanged(callback: (state: ITicTacToeState) => void, context?: Game) {
    this.events.once('on-state-changed', callback, context)
  }

  onBoardChanged(callback: (board: number[]) => void, context?: Game) {
    this.events.on('board-changed', callback, context)
  }
}
