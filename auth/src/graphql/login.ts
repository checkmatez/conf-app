import { extendType, objectType, stringArg, unionType } from '@nexus/schema'
import { UserModel } from '../models/user-model'
import { generateTokens } from '../services/generate-tokens'
import { comparePasswords } from '../services/password'

export const LoginResponseType = unionType({
  name: 'LoginResponse',
  definition(t) {
    t.members('AuthResult', 'LoginError')
    t.resolveType((root) => ('argErrors' in root ? 'LoginError' : 'AuthResult'))
  },
})

export const LoginErrorType = objectType({
  name: 'LoginError',
  definition(t) {
    t.implements('InputError')
    t.string('code')
    t.string('message')
    t.list.field('argErrors', { type: 'InputArgError' })
  },
})

export const LoginMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'LoginResponse',
      args: {
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (_, { username, password }, ctx) => {
        const existingUser = await UserModel.query().findOne({ username })
        if (!existingUser) {
          return {
            code: 'INPUT_ERROR',
            message: 'Invalid credentials',
            argErrors: [],
          }
        }

        const match = await comparePasswords(existingUser.password, password)
        if (!match) {
          return {
            code: 'INPUT_ERROR',
            message: 'Invalid credentials',
            argErrors: [],
          }
        }

        const { accessToken, refreshToken } = await generateTokens(
          existingUser.id,
          existingUser.role,
        )

        return {
          accessToken,
          refreshToken,
          user: {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
          },
        }
      },
    })
  },
})
