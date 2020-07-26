import {
  AccessTokenPayload,
  NewChatMessageEvent,
  Subject,
} from '@checkmatez-conf/common'
import { Context } from 'koa'
import { NewChatMessageListener } from '../events/listeners/new-chat-message-listener'
import { natsWrapper } from '../nats/nats-wrapper'
import { verifyAccessToken } from '../utils/verify-access-token'

export interface GraphqlContext {
  user: AccessTokenPayload | null
  listener: NewChatMessageListener<NewChatMessageEvent>
}

export const getContext = async (
  ctx: Context | object,
): Promise<GraphqlContext> => {
  const result: GraphqlContext = {
    listener: new NewChatMessageListener<NewChatMessageEvent>(
      natsWrapper.client,
      Subject.NewChatMessage,
    ),
    user: null,
  }

  let authorization
  if (isContext(ctx)) {
    authorization = ctx.request.get('Authorization')
  } else {
    authorization = (ctx as any).authorization
  }
  if (!authorization) {
    return result
  }

  const accessToken = authorization.replace('Bearer ', '')
  const tokenPayload = await verifyAccessToken(accessToken)

  result.user = tokenPayload

  return result
}

const isContext = (ctx: Context | object): ctx is Context =>
  !!(ctx as Context).request
