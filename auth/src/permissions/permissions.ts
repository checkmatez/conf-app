import { allow, shield } from 'graphql-shield'
import { AuthenticationError } from '../errors/authentication-error'
import { isAuthenticated } from './rules'

export const permissions = shield(
  {
    Query: {
      currentUser: isAuthenticated,
      users: isAuthenticated,
    },
    Mutation: {},
  },
  {
    allowExternalErrors: true,
    fallbackRule: allow,
    fallbackError: new AuthenticationError('Требуется аутентификация'),
  },
)
