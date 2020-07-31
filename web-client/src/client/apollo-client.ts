import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  ACCESS_TOKEN_KEY,
  AUTH_GRAPHQL_URI,
  CHAT_GRAPHQL_WEBSOCKET,
} from '../config/constants'

const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
  },
}))

const httpLink = new HttpLink({
  uri: AUTH_GRAPHQL_URI,
})

const httpWithAuth = from([setAuthorizationLink, httpLink])

const wsLink = new WebSocketLink({
  uri: CHAT_GRAPHQL_WEBSOCKET,
  options: {
    reconnect: true,
    connectionParams: () => ({
      authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
    }),
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpWithAuth,
)

export const apolloCache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  cache: apolloCache,
  link: splitLink,
})
