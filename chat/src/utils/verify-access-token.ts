import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { ENV } from '../config/constants'
import { AccessTokenPayload } from './access-token-payload'

const verify = promisify<
  string,
  jwt.Secret | jwt.GetPublicKeyOrSecret,
  object | undefined
>(jwt.verify)

export const verifyAccessToken = async (accessToken: string) => {
  try {
    const payload = await verify(accessToken, ENV.JWT_SECRET)
    if (payload) {
      return payload as AccessTokenPayload
    }
    return null
  } catch (error) {
    return null
  }
}
