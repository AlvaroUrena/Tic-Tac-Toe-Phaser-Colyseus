import { Client } from 'colyseus.js'

export default class Server {
  private client: Client
  constructor() {
    this.client = new Client('ws://localhost:2567')
    console.log(this.client)
  }

  async join() {
    try {
      const room = await this.client.joinOrCreate('tic-tac-toe')
      console.log(room)
    } catch (e) {
      console.error(e)
    }
  }
}
