import { ApolloServer } from 'apollo-server'
import { schema } from '../graphql/schema'
import { getContext } from './get-context'

export const server = new ApolloServer({
  schema,
  context: getContext,
  playground: true,
  introspection: true,
})
