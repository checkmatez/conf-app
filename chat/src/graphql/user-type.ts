import { objectType } from '@nexus/schema'

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
