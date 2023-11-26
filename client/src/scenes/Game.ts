import Phaser from 'phaser'
import type Server from '../services/Server'
import ITicTacToeState from '@shared/interfaces/ITicTacToeState'

export default class Game extends Phaser.Scene {
  private readonly GAP = 10
  private readonly CELDA_SIZE = 128

  constructor() {
    super('game')
  }

  async create(data: { server: Server }) {
    const { server } = data

    await server.join()

    server.onceStateChanged(this.createBoard, this)
  }

  private createBoard(state: ITicTacToeState) {
    const { width, height } = this.scale // Width & Height of Canvas
    const BOARD_X = width / 2 - this.CELDA_SIZE // Middle of Canvas Width
    const BOARD_Y = height / 2 - this.CELDA_SIZE // Middle of Canvas Height

    let x = BOARD_X
    let y = BOARD_Y
    state.board.forEach((cellState, i) => {
      this.add.rectangle(x, y, this.CELDA_SIZE, this.CELDA_SIZE, 0xfff)
      x += this.CELDA_SIZE + this.GAP

      if ((i + 1) % 3 === 0) {
        y += this.CELDA_SIZE + this.GAP
        x = BOARD_X
      }
    })
  }
}
