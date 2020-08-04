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

// Cached token
let token: string | null

const withAccessTokenLink = setContext(() => {
  // if we have a cached value, return it immediately
  if (token) {
    return { headers: { authorization: `Bearer ${token}` } }
  }

  // get and cache it
  token = localStorage.getItem(ACCESS_TOKEN_KEY)

  return { headers: { authorization: `Bearer ${token}` } }
})

const httpLink = new HttpLink({
  uri: AUTH_GRAPHQL_URI,
})

const httpWithAuth = from([withAccessTokenLink, httpLink])

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

apolloClient.onResetStore(async () => {
  token = null
})
