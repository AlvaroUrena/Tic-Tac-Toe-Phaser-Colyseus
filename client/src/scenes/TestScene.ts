import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'

export class TestScene extends Phaser.Scene {
  private client?: Colyseus.Client

  init() {
    this.client = new Colyseus.Client('ws://localhost:2567')
  }

  preload() {}

  async create() {
    try {
      const room = await this.client?.joinOrCreate('my_room')
      console.log(room?.sessionId)

      room?.onMessage('keydown', message => {
        console.log('a')

        console.log(message)
      })

      this.input.keyboard?.on('keydown', (e: KeyboardEvent) => {
        room?.send('keydown', e.key)
      })
    } catch (e) {
      console.error(e)
    }
  }
}
