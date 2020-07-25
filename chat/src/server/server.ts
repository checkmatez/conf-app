import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { schema } from '../graphql/schema'
import { permissions } from '../permissions/permissions'
import { context } from './context'

export const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context,
  playground: true,
  introspection: true,
})
