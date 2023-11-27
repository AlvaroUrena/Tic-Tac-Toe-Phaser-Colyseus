import Phaser from 'phaser'
import type Server from '../services/Server'
import ITicTacToeState, { Cell } from '@shared/interfaces/ITicTacToeState'

export default class Game extends Phaser.Scene {
  private readonly GAP = 10
  private readonly CELDA_SIZE = 128

  private server?: Server
  private cells: { display: Phaser.GameObjects.Rectangle; value: Cell }[] = []

  constructor() {
    super('game')
  }

  async create(data: { server: Server }) {
    this.server = data.server

    if (!this.server) {
      throw new Error('server instance missing')
    }

    await this.server.join()

    this.server.onceStateChanged(this.createBoard, this)
  }

  private createBoard(state: ITicTacToeState) {
    const { width, height } = this.scale // Width & Height of Canvas
    const BOARD_X = width / 2 - this.CELDA_SIZE // Middle of Canvas Width
    const BOARD_Y = height / 2 - this.CELDA_SIZE // Middle of Canvas Height

    let x = BOARD_X
    let y = BOARD_Y
    state.board.forEach((cellState, i) => {
      const cell = this.add
        .rectangle(x, y, this.CELDA_SIZE, this.CELDA_SIZE, 0xfff)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
          this.server?.makeSelection(i)
        })
      this.cells.push({ display: cell, value: cellState })

      x += this.CELDA_SIZE + this.GAP

      if ((i + 1) % 3 === 0) {
        y += this.CELDA_SIZE + this.GAP
        x = BOARD_X
      }
    })

    this.server?.onBoardChanged(this.handleBoardChanged, this)
  }

  private handleBoardChanged(board: Cell[]) {
    for (let i = 0; i < board.length; i++) {
      const cell = this.cells[i]

      if (cell.value !== board.at(i)) {
        this.add
          .star(cell.display.x, cell.display.y, 4, 4, 60, 0xff0000)
          .setAngle(45)
        cell.value = board.at(i) as Cell
      }
    }
  }
}
