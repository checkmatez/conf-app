import { extendType, objectType } from '@nexus/schema'
import { makeListResult } from '../utils/make-list-result'

export const UserType = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('username')
    t.string('email', { nullable: true })
    t.string('avatarUrl', { nullable: true })
    t.string('githubProfileUrl', { nullable: true })
  },
})

export const UsersResultType = makeListResult('UsersResult', 'User')

export const QueryUsers = extendType({
  type: 'Query',
  definition(t) {
    t.field('users', {
      type: 'UsersResult',
      resolve: () => ({ nodes: [], total: 0 }),
    })
  },
})
