import cors from '@koa/cors'
import koaPlayground from 'graphql-playground-middleware-koa'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { schema } from '../graphql/schema'
import { logger } from '../logger/pino'
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware'
import { graphqlHttpMiddleware } from '../middlewares/graphql-http-middleware'
import { getContext } from './get-context'

export const app = new Koa()

app.use(async (ctx, next) => {
  ctx.logger = logger
  return await next()
})
app.use(cors())
app.use(bodyParser())

export const graphqlRouter = new Router()

graphqlRouter.get(
  '/',
  koaPlayground({ endpoint: '/', subscriptionEndpoint: '/' }),
)

graphqlRouter.post('/', graphqlHttpMiddleware({ schema, getContext }))

app.use(graphqlRouter.middleware())
app.use(graphqlRouter.allowedMethods())

app.use(errorHandlerMiddleware)
