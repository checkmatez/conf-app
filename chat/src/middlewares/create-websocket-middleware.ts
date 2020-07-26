import { Context, Next } from 'koa'
import WebSocket from 'ws'

export interface WebSocketContext extends Context {
  getWebsocket?: () => Promise<WebSocket>
}

export const createWebsocketMiddleware = (
  options?: WebSocket.ServerOptions,
) => {
  const wss = new WebSocket.Server({ ...options, noServer: true })

  const websocketMiddleware = async (ctx: Context, next: Next) => {
    const upgradeHeader = ctx.request
      .get('upgrade')
      .split(',')
      .map((s) => s.trim())

    if (upgradeHeader.includes('websocket')) {
      const getWebsocket = () =>
        new Promise((resolve) => {
          wss.handleUpgrade(
            ctx.req,
            ctx.request.socket,
            Buffer.alloc(0),
            resolve,
          )
          ctx.respond = false
        })
      ctx.getWebsocket = getWebsocket
    }

    await next()
  }

  websocketMiddleware.wss = wss

  return websocketMiddleware
}
