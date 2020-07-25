import { objectType } from '@nexus/schema'

export const ChatRoomType = objectType({
  name: 'ChatRoom',
  definition(t) {
    t.id('id')
    t.string('name')
  },
})
