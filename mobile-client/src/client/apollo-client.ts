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
import { AsyncStorage } from 'react-native'
import {
  ACCESS_TOKEN_KEY,
  AUTH_GRAPHQL_URI,
  CHAT_GRAPHQL_URI,
  CHAT_GRAPHQL_WEBSOCKET,
  REFRESH_TOKEN_KEY,
} from '../config/constants'
import {
  AuthResult,
  GenerateTokensMutationVariables,
  GenerateTokensResponse,
} from '../generated/graphql'
import { generateTokensMutation } from '../graphql/mutations/generate-tokens-mutation'

// Cached token
let token: string | null

const withAccessTokenLink = setContext(async () => {
  // if we have a cached value, return it immediately
  if (token) {
    return { headers: { authorization: `Bearer ${token}` } }
  }

  // get and cache it
  token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY)

  return { headers: { authorization: `Bearer ${token}` } }
})

const httpLink = new HttpLink({
  uri: (op) => {
    const ctx = op.getContext()
    switch (ctx.server) {
      case 'chat':
        return CHAT_GRAPHQL_URI
      default:
        return AUTH_GRAPHQL_URI
    }
  },
})

// const retryWithRefreshTokenLink = onError(
//   async ({ graphQLErrors, operation, forward }) => {
//     if (
//       graphQLErrors &&
//       graphQLErrors.some(
//         (err) => err.extensions && err.extensions.code === 'UNAUTHENTICATED',
//       )
//     ) {
//       const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY)
//       if (!refreshToken) {
//         return
//       }

//       const oldHeaders = operation.getContext().headers
//       const promise = getNewAccessToken(refreshToken)

//       return promiseToObservable(promise)
//         .filter((v) => v !== undefined)
//         .flatMap((newToken) => {
//           operation.setContext({
//             headers: {
//               ...oldHeaders,
//               authorization: `Bearer ${newToken}`,
//             },
//           })
//           // retry the request, returning the new observable
//           return forward(operation)
//         })
//     }
//   },
// )

const httpWithAuth = from([
  withAccessTokenLink,
  // retryWithRefreshTokenLink,
  httpLink,
])

const wsLink = new WebSocketLink({
  uri: CHAT_GRAPHQL_WEBSOCKET,
  options: {
    reconnect: true,
    connectionParams: async () => ({
      authorization: `Bearer ${await AsyncStorage.getItem(ACCESS_TOKEN_KEY)}`,
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

const getNewAccessToken = async (
  refreshToken: string,
): Promise<string | undefined> => {
  const newClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
  const { data } = await newClient.mutate<
    { generateTokens: GenerateTokensResponse },
    GenerateTokensMutationVariables
  >({
    mutation: generateTokensMutation,
    variables: { refreshToken },
  })
  if (!data) {
    return
  }
  if (!dataIsLoginWithRefreshTokenData(data.generateTokens)) {
    await apolloClient.resetStore()
    return
  }

  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, data.generateTokens.accessToken],
    [REFRESH_TOKEN_KEY, data.generateTokens.refreshToken],
  ])
  token = data.generateTokens.accessToken

  return data.generateTokens.accessToken
}

const dataIsLoginWithRefreshTokenData = (data: any): data is AuthResult =>
  data.__typename === 'AuthResult'
