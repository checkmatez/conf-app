import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { schema } from '../graphql/schema'
import { logger } from '../logger/pino'
import { createWebsocketMiddleware } from '../middlewares/create-websocket-middleware'
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware'
import { graphqlOverWebsocketMiddleware } from '../middlewares/graphql-over-websocket-middleware'
import { graphqlRouter } from '../routers/graphql-router'
import { healthChecksRouter } from '../routers/health-checks-router'

export const app = new Koa()

app.use(async (ctx, next) => {
  ctx.logger = logger
  return await next()
})
app.use(cors())
app.use(bodyParser())
app.use(createWebsocketMiddleware())
app.use(graphqlOverWebsocketMiddleware({ schema }))

app.use(healthChecksRouter.middleware())
app.use(healthChecksRouter.allowedMethods())

app.use(graphqlRouter.middleware())
app.use(graphqlRouter.allowedMethods())

app.use(errorHandlerMiddleware)
