import { shield } from 'graphql-shield'
import { ForbiddenError } from '../errors/forbidden-error'
import * as rules from './rules'

export const permissions = shield(
  {
    Query: {},
    Mutation: {
      createChatRoom: rules.isAdmin,
    },
  },
  {
    allowExternalErrors: true,
    fallbackRule: rules.isAuthenticated,
    fallbackError: new ForbiddenError('Действие запрещено'),
  },
)
