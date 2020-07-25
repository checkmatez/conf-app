import { objectType } from '@nexus/schema'

export const MessageType = objectType({
  name: 'Message',
  definition(t) {
    t.id('id')
    t.string('text')
    t.field('author', { type: 'User' })
    t.field('chatRoom', { type: 'ChatRoom' })
  },
})
