import { AccessTokenPayload, UserRole } from '@checkmatez-conf/common'
import { randomBytes } from 'crypto'
import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { ENV } from '../config/constants'
import { RefreshTokenModel } from '../models/refresh-token'
import { RefreshTokenPayload } from '../utils/refresh-token-payload'

const RANDOM_BYTES_SIZE = 16

interface AuthTokens {
  accessToken: string
  refreshToken: string
}

const sign = promisify<
  string | Buffer | object,
  string,
  jwt.SignOptions,
  string
>(jwt.sign)

export const generateTokens = async (
  userId: string,
  role: UserRole,
): Promise<AuthTokens> => {
  const jti = randomBytes(RANDOM_BYTES_SIZE).toString('hex')

  const expiredAt = new Date(
    Date.now() + ENV.REFRESH_TOKEN_EXPIRES_IN_SEC * 1000,
  )
  await RefreshTokenModel.query().insertGraph(
    { jti, expiredAt, user: { id: userId } },
    { relate: true },
  )

  const accessTokenPayload: AccessTokenPayload = { userId, role }
  const refreshTokenPayload: RefreshTokenPayload = { jti, userId }
  const [accessToken, refreshToken] = await Promise.all([
    sign(accessTokenPayload, ENV.JWT_SECRET, {
      expiresIn: ENV.ACCESS_TOKEN_EXPIRES_IN_SEC,
    }),
    sign(refreshTokenPayload, ENV.JWT_SECRET, {
      expiresIn: ENV.REFRESH_TOKEN_EXPIRES_IN_SEC,
    }),
  ])

  return { accessToken, refreshToken }
}
