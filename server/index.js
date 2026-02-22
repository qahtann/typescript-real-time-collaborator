import { WebSocketServer } from "ws"
import * as http from "http"
import { setupWSConnection } from "y-websocket/bin/utils.js"

const port = process.env.PORT || 1234

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" })
  response.end("Yjs WebSocket Server")
})

const wss = new WebSocketServer({ server })

wss.on("connection", (ws, req) => {
  setupWSConnection(ws, req)
})

server.listen(port, () => {
  console.log(`Yjs WebSocket server running on ws://localhost:${port}`)
})
