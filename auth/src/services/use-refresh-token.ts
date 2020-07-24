import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { ENV } from '../config/constants'
import { RefreshTokenModel } from '../models/refresh-token'
import { RefreshTokenPayload } from '../utils/refresh-token-payload'

const verify = promisify<
  string,
  jwt.Secret | jwt.GetPublicKeyOrSecret,
  object | undefined
>(jwt.verify)

export const useRefreshToken = async (
  refreshToken: string,
): Promise<RefreshTokenPayload> => {
  const tokenPayload = await verifyRefreshToken(refreshToken)
  if (!tokenPayload) {
    throw new Error('Invalid refresh token')
  }
  const affected = await RefreshTokenModel.query()
    .patch({ usedAt: new Date() })
    .where({
      jti: tokenPayload.jti,
      revoked_at: null,
      used_at: null,
    })
  if (affected === 0) {
    throw new Error('Invalid refresh token')
  }

  return tokenPayload
}

export const verifyRefreshToken = async (
  refreshToken: string,
): Promise<RefreshTokenPayload | null> => {
  try {
    const payload = await verify(refreshToken, ENV.JWT_SECRET)
    if (payload) {
      return payload as RefreshTokenPayload
    }
    return null
  } catch (error) {
    return null
  }
}
