import koaPlayground from 'graphql-playground-middleware-koa'
import Router from 'koa-router'
import { getContext } from '../context/get-context'
import { schema } from '../graphql/schema'
import { graphqlHttpMiddleware } from '../middlewares/graphql-http-middleware'

export const graphqlRouter = new Router()

graphqlRouter.get(
  '/',
  koaPlayground({ endpoint: '/', subscriptionEndpoint: '/' }),
)

graphqlRouter.post('/', graphqlHttpMiddleware({ schema, getContext }))
