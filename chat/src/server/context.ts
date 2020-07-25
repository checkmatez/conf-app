import { Request } from 'express'
import { AccessTokenPayload } from '../utils/access-token-payload'
import { verifyAccessToken } from '../utils/verify-access-token'

export interface GraphqlContext {
  user: AccessTokenPayload | null
}

export const context = async ({
  req,
}: {
  req: Request
}): Promise<GraphqlContext> => {
  const authorization = req.get('Authorization')
  if (!authorization) {
    return { user: null }
  }

  const accessToken = authorization.replace('Bearer ', '')
  const tokenPayload = await verifyAccessToken(accessToken)

  return {
    user: tokenPayload,
  }
}
