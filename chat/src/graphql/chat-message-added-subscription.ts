import { idArg, subscriptionField } from '@nexus/schema'
import { GraphqlContext } from '../server/get-context'
import { NexusGenArgTypes } from './generated/types'

async function* subscribe(
  root: any,
  { chatRoomId }: NexusGenArgTypes['Subscription']['chatMessageAdded'],
  ctx: GraphqlContext,
) {
  for await (const chatMessage of ctx.listener.subscribe()) {
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
