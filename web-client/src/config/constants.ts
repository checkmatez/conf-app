export const ACCESS_TOKEN_KEY = 'access-token'

export const REFRESH_TOKEN_KEY = 'refresh-token'

export const AUTH_GRAPHQL_URI =
  process.env.NODE_ENV === 'production' ? '/api/auth' : 'http://localhost:4070'

export const CHAT_GRAPHQL_WEBSOCKET =
  process.env.NODE_ENV === 'production'
    ? window.location.protocol === 'https:'
      ? `wss://${window.location.host}/api/chat`
      : `ws://${window.location.host}/api/chat`
    : 'ws://localhost:4071'
