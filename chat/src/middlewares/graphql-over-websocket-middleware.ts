import { ExecutionResult, GraphQLSchema, parse, subscribe } from 'graphql'
import { Next } from 'koa'
import WebSocket from 'ws'
import { getContext } from '../server/get-context'
import { WebSocketContext } from './create-websocket-middleware'

const isExecResult = (
  data: AsyncIterableIterator<ExecutionResult> | ExecutionResult,
): data is ExecutionResult => {
  if ((data as ExecutionResult).errors) {
    return true
  }
  return false
}

const getParsed = (data: string | Buffer | any) =>
  typeof data === 'string'
    ? JSON.parse(data)
    : JSON.parse(data.toString('utf8'))

interface Options {
  schema: GraphQLSchema
  rootValue?: any
}

export const graphqlOverWebsocketMiddleware = ({
  schema,
  rootValue,
}: Options) => async (ctx: WebSocketContext, next: Next) => {
  if (!ctx.getWebsocket) {
    return await next()
  }
  const ws = await ctx.getWebsocket()
  ctx.idToSubscriptions = {}

  const onMessage = async (data: WebSocket.Data) => {
    ctx.logger.info('ws message', data)
    const parsedData = getParsed(data)
    // https://github.com/apollographql/subscriptions-transport-ws/blob/master/src/message-types.ts
    // https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md
    if (parsedData.type === 'connection_init') {
      ctx.graphqlContext = await getContext(parsedData.payload)
    } else if (parsedData.type === 'start') {
      const { operationName, query, variables } = parsedData.payload
      const document = parse(query)
      ctx.logger.info('graphqlContext', ctx.graphqlContext)

      const subResult = await subscribe({
        schema,
        document,
        rootValue,
        contextValue: ctx.graphqlContext,
        variableValues: variables,
      })
      if (isExecResult(subResult)) {
        ctx.logger.error('Error in exec:', subResult)
        ws.send(
          JSON.stringify({
            id: parsedData.id,
            type: 'error',
            payload: subResult,
          }),
        )
        return
      }

      ctx.idToSubscriptions[parsedData.id] = subResult
      for await (const payload of subResult) {
        ctx.logger.info('ws response payload=', payload)
        ws.send(JSON.stringify({ id: parsedData.id, type: 'data', payload }))
      }
    } else if (parsedData.type === 'stop') {
      ctx.idToSubscriptions[parsedData.id]?.return?.()
    }
  }

  ws.on('message', onMessage)

  ws.on('open', () => {
    ctx.logger.info('ws open')
  })
  ws.on('error', (err) => {
    ctx.logger.error('ws error', err)
  })
  ws.on('close', (code, reason) => {
    ctx.logger.info('ws close, code, reason', code, reason)
  })
  ws.on('ping', (data) => {
    ctx.logger.info('ws ping')
  })
  ws.on('pong', (data) => {
    ctx.logger.info('ws pong')
  })
}
