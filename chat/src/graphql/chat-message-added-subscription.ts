import { idArg, subscriptionField } from '@nexus/schema'
import { GraphqlContext } from '../context/get-context'
import { logger } from '../logger/pino'
import { NexusGenArgTypes } from './generated/types'

async function* subscribe(
  root: any,
  { chatRoomId }: NexusGenArgTypes['Subscription']['chatMessageAdded'],
  ctx: GraphqlContext,
) {
  logger.debug('subscrived to chat messages for roomid %s', chatRoomId)
  for await (const chatMessage of ctx.listener.subscribe()) {
    logger.trace('received chat message %o', chatMessage)
    if (chatMessage.chatRoom.id === chatRoomId) {
      yield { chatMessageAdded: chatMessage }
    }
  }
}

export const ChatMessageAddedSubscription = subscriptionField(
  'chatMessageAdded',
  {
    type: 'Message',
    args: {
      chatRoomId: idArg({ required: true }),
    },
    subscribe,
    resolve: undefined as any,
  },
)
