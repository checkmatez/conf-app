import { InputArgErrorType, InputErrorInterface } from '@checkmatez-conf/common'
import { makeSchema, queryType } from '@nexus/schema'
import { join } from 'path'
import { ChatRoomType } from './chat-room'
import {
  CreateChatRoomErrorType,
  CreateChatRoomMutation,
  CreateChatRoomResponseType,
} from './create-chat-room'
import { MessageType } from './message'
import { NewChatMessageMutation } from './new-chat-message'
import { UserType } from './user-type'

const Query = queryType({
  definition(t) {
    t.string('serviceDescription', { resolve: () => 'Authorization service' })
  },
})

export const schema = makeSchema({
  types: [
    Query,
    InputArgErrorType,
    InputErrorInterface,
    UserType,
    ChatRoomType,
    CreateChatRoomMutation,
    CreateChatRoomResponseType,
    CreateChatRoomErrorType,
    MessageType,
    NewChatMessageMutation,
  ],
  outputs: {
    schema: join(__dirname, 'generated', 'schema.graphql'),
    typegen: join(__dirname, 'generated', 'types.ts'),
  },
})
