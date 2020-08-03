import { makeListResult } from '@checkmatez-conf/common'
import { extendType, intArg } from '@nexus/schema'
import { ChatRoomModel } from '../models/chat-room-model'

export const ChatRoomsResultType = makeListResult('ChatRoomsResult', 'ChatRoom')

export const QueryChatRooms = extendType({
  type: 'Query',
  definition(t) {
    t.field('chatRooms', {
      type: 'ChatRoomsResult',
      args: {
        page: intArg({ default: 0 }),
        pageSize: intArg({ default: 20 }),
      },
      resolve: async (_, { page = 0, pageSize = 20 }) => {
        const { total, results } = await ChatRoomModel.query()
          .page(page!, pageSize!)
          .orderBy([{ column: 'name', order: 'ASC' }])

        return {
          total,
          nodes: results,
        }
      },
    })
  },
})
