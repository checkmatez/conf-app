import { AccessTokenPayload } from '@checkmatez-conf/common'
import { Context } from 'koa'
import { verifyAccessToken } from '../utils/verify-access-token'

export interface GraphqlContext {
  user: AccessTokenPayload | null
}

export const getContext = async (ctx: Context): Promise<GraphqlContext> => {
  const result: GraphqlContext = {
    user: null,
  }

  const authorization = ctx.request.get('Authorization')

  if (!authorization) {
    return result
  }

  const accessToken = authorization.replace('Bearer ', '')
  const tokenPayload = await verifyAccessToken(accessToken)

  result.user = tokenPayload

  return result
}
