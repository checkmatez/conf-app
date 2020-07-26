import { extendType, idArg, stringArg } from '@nexus/schema'
import { NewChatMessagePublisher } from '../events/publishers/new-chat-message-publisher'
import { ChatRoomModel } from '../models/chat-room-model'
import { MessageModel } from '../models/message-model'
import { UserModel } from '../models/user-model'
import { natsWrapper } from '../nats/nats-wrapper'
import { GraphqlContext } from '../server/get-context'

export const AddChatMessageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addChatMessage', {
      type: 'Message',
      args: {
        text: stringArg({ required: true }),
        chatRoomId: idArg({ required: true }),
      },
      resolve: async (_, { text, chatRoomId }, ctx: GraphqlContext) => {
        const message = await MessageModel.query()
          .insert({ text, chatRoomId, authorId: ctx.user!.userId })
          .returning('*')

        const author = await UserModel.query().findById(ctx.user!.userId)
        const chatRoom = await ChatRoomModel.query().findById(chatRoomId)

        await new NewChatMessagePublisher(natsWrapper.client).publish({
          id: message.id,
          text: message.text,
          version: 1,
          author: {
            id: author.id,
            username: author.username,
            avatarUrl: author.avatarUrl,
          },
          chatRoom: {
            id: chatRoom.id,
            name: chatRoom.name,
          },
        })

        return message
      },
    })
  },
})
