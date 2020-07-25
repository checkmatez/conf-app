import { extendType, idArg, stringArg } from '@nexus/schema'
import { MessageModel } from '../models/message-model'

export const NewChatMessageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('newChatMessage', {
      type: 'Message',
      args: {
        text: stringArg({ required: true }),
        chatRoomId: idArg({ required: true }),
      },
      resolve: async (_, { text, chatRoomId }, ctx) => {
        const message = await MessageModel.query()
          .insert({ text, chatRoomId, authorId: ctx.user.userId })
          .returning('*')
        return message
      },
    })
  },
})
