import { ENV } from '../config/constants'
import { UserModel } from '../models/user-model'
import { UserRole } from '../utils/access-token-payload'
import { passwordToHash } from './password'

export const createAdminUserIfNotExist = async () => {
  const admin = await UserModel.query().findOne({
    username: ENV.ADMIN_USERNAME,
  })
  if (admin) {
    return
  }
  const hash = await passwordToHash(ENV.ADMIN_PASSWORD)
  await UserModel.query().insert({
    username: ENV.ADMIN_USERNAME,
    password: hash,
    role: UserRole.Admin,
  })
}
