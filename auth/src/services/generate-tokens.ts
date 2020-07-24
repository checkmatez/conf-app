import { randomBytes } from 'crypto'
import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'
import {
  ACCESS_TOKEN_EXPIRES_IN_SEC,
  ENV,
  REFRESH_TOKEN_EXPIRES_IN_SEC,
} from '../config/constants'
import { RefreshTokenModel } from '../models/refresh-token'
import { AccessTokenPayload, UserRole } from '../utils/access-token-payload'

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

  const expiredAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN_SEC * 1000)
  await RefreshTokenModel.query().insertGraph(
    { jti, expiredAt, user: { id: userId } },
    { relate: true },
  )

  const payload: AccessTokenPayload = { userId, role }
  const [accessToken, refreshToken] = await Promise.all([
    sign(payload, ENV.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN_SEC,
    }),
    sign({ jti, userId, role }, ENV.JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN_SEC,
    }),
  ])

  return { accessToken, refreshToken }
}
