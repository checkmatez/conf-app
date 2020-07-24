import { randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

const RANDOM_BYTES_SIZE = 16
const HASH_AND_SALT_SEPARATOR = '.'

const scryptAsync = promisify(scrypt)

export const passwordToHash = async (password: string) => {
  const salt = randomBytes(RANDOM_BYTES_SIZE).toString('hex')
  const buf = (await scryptAsync(password, salt, 64)) as Buffer

  return `${buf.toString('hex')}${HASH_AND_SALT_SEPARATOR}${salt}`
}

export const comparePasswords = async (
  storedPassword: string,
  suppliedPassword: string,
) => {
  const [hashedPassword, salt] = storedPassword.split('.')
  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer

  return buf.toString('hex') === hashedPassword
}
