import { Server } from 'colyseus'
import { WebSocketTransport } from '@colyseus/ws-transport'
import { monitor } from '@colyseus/monitor'
import cors from 'cors'
import { createServer } from 'http'
import express from 'express'

// Import rooms
import { TicTacToe } from './rooms/TicTacToe'

// Creating server
const port = Number(process.env.port) || 2567
const app = express()

app.use(cors())
app.use(express.json())
app.use('/colyseus', monitor())

const gameServer = new Server({
  transport: new WebSocketTransport({
    server: createServer(app)
  })
})

// Register room handlers
gameServer.define('tic-tac-toe', TicTacToe)

// Listen
gameServer.listen(port)
console.log(`Listening on ws://localhost:${port}`)
