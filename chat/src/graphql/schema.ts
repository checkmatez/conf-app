import { InputArgErrorType, InputErrorInterface } from '@checkmatez-conf/common'
import { makeSchema, queryType } from '@nexus/schema'
import { applyMiddleware } from 'graphql-middleware'
import { join } from 'path'
import { permissions } from '../permissions/permissions'
import { AddChatMessageMutation } from './add-chat-message'
import { ChatMessageAddedSubscription } from './chat-message-added-subscription'
import { ChatRoomType } from './chat-room'
import {
  CreateChatRoomErrorType,
  CreateChatRoomMutation,
  CreateChatRoomResponseType,
} from './create-chat-room'
import { MessageType } from './message'
import { UserType } from './user-type'

const Query = queryType({
  definition(t) {
    t.string('serviceDescription', { resolve: () => 'Authorization service' })
  },
})

export const schemaWithoutMiddlewares = makeSchema({
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
    AddChatMessageMutation,
    ChatMessageAddedSubscription,
  ],
  outputs: {
    schema: join(__dirname, 'generated', 'schema.graphql'),
    typegen: join(__dirname, 'generated', 'types.ts'),
  },
})

export const schema = applyMiddleware(schemaWithoutMiddlewares, permissions)
