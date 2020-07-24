import { extendType, objectType, stringArg, unionType } from '@nexus/schema'
import { UniqueViolationError } from 'objection'
import { UserModel } from '../models/user-model'
import { generateTokens } from '../services/generate-tokens'
import { passwordToHash } from '../services/password'
import { UserRole } from '../utils/access-token-payload'

export const SignupResponseType = unionType({
  name: 'SignupResponse',
  definition(t) {
    t.members('AuthResult', 'SignupError')
    t.resolveType((root) =>
      'argErrors' in root ? 'SignupError' : 'AuthResult',
    )
  },
})

export const SignupErrorType = objectType({
  name: 'SignupError',
  definition(t) {
    t.implements('InputError')
    t.string('code')
    t.string('message')
    t.list.field('argErrors', { type: 'InputArgError' })
  },
})

export const SignupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'SignupResponse',
      args: {
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
        email: stringArg(),
      },
      resolve: async (_, { username, email, password }, ctx) => {
        const hash = await passwordToHash(password)
        try {
          const user = await UserModel.query()
            .insert({ username, password: hash, email: email ?? undefined })
            .returning('*')
          const { accessToken, refreshToken } = await generateTokens(
            user.id,
            UserRole.Attendee,
          )

          return {
            accessToken,
            refreshToken,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
            },
          }
        } catch (error) {
          if (error instanceof UniqueViolationError) {
            return {
              code: 'INPUT_ERROR',
              message: 'Username already taken',
              argErrors: [{ argName: 'username', message: 'already exist' }],
            }
          }
          throw error
        }
      },
    })
  },
})
