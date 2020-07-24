import { objectType } from '@nexus/schema'

export const AuthResultType = objectType({
  name: 'AuthResult',
  definition(t) {
    t.string('accessToken')
    t.string('refreshToken')
    t.field('user', { type: 'User' })
  },
})
