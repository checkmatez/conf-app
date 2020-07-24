import { extendType, objectType, stringArg, unionType } from '@nexus/schema'
import { UserModel } from '../models/user-model'
import { generateTokens } from '../services/generate-tokens'
import { useRefreshToken } from '../services/use-refresh-token'
import { UserRole } from '../utils/access-token-payload'

export const GenerateTokensResponseType = unionType({
  name: 'GenerateTokensResponse',
  definition(t) {
    t.members('AuthResult', 'GenerateTokensError')
    t.resolveType((root) =>
      'argErrors' in root ? 'GenerateTokensError' : 'AuthResult',
    )
  },
})

export const GenerateTokensError = objectType({
  name: 'GenerateTokensError',
  definition(t) {
    t.implements('InputError')
    t.string('code')
    t.string('message')
    t.list.field('argErrors', { type: 'InputArgError' })
  },
})

export const GenerateTokensMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('generateTokens', {
      type: 'GenerateTokensResponse',
      args: {
        refreshToken: stringArg({ required: true }),
      },
      resolve: async (_, { refreshToken }, ctx) => {
        try {
          const payload = await useRefreshToken(refreshToken)
          const [tokens, user] = await Promise.all([
            generateTokens(payload.userId, UserRole.Attendee),
            UserModel.query().findById(payload.userId),
          ])

          return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user,
          }
        } catch (error) {
          return {
            code: 'INPUT_ERROR',
            message: 'Invalid credentials',
            argErrors: [],
          }
        }
      },
    })
  },
})
