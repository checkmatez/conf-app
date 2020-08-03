import { makeListResult } from '@checkmatez-conf/common'
import { extendType, idArg, intArg } from '@nexus/schema'
import { MessageModel } from '../models/message-model'

export const MessagesResultType = makeListResult('MessagesResult', 'Message')

export const QueryMessages = extendType({
  type: 'Query',
  definition(t) {
    t.field('messages', {
      type: 'MessagesResult',
      args: {
        chatRoomId: idArg({ required: true }),
        page: intArg({ default: 0 }),
        pageSize: intArg({ default: 20 }),
      },
      resolve: async (_, { chatRoomId, page = 0, pageSize = 20 }) => {
        const { total, results } = await MessageModel.query()
          .where('chat_room_id', chatRoomId)
          .page(page!, pageSize!)
          .orderBy([{ column: 'created_at', order: 'DESC' }])

        return {
          total,
          nodes: results,
        }
      },
    })
  },
})
