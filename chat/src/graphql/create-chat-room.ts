import { extendType, objectType, stringArg, unionType } from '@nexus/schema'
import { ChatRoomModel } from '../models/chat-room-model'

export const CreateChatRoomResponseType = unionType({
  name: 'CreateChatRoomResponse',
  definition(t) {
    t.members('ChatRoom', 'CreateChatRoomError')
    t.resolveType((root) =>
      'argErrors' in root ? 'CreateChatRoomError' : 'ChatRoom',
    )
  },
})

export const CreateChatRoomErrorType = objectType({
  name: 'CreateChatRoomError',
  definition(t) {
    t.implements('InputError')
    t.string('code')
    t.string('message')
    t.list.field('argErrors', { type: 'InputArgError' })
  },
})

export const CreateChatRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createChatRoom', {
      type: 'CreateChatRoomResponse',
      args: {
        name: stringArg({ required: true }),
      },
      resolve: async (_, { name }, ctx) => {
        const chatRoom = await ChatRoomModel.query()
          .insert({ name })
          .returning('*')
        return chatRoom
      },
    })
  },
})
