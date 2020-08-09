import { cleanEnv } from 'envalid'

export const ENV = cleanEnv(
  process.env,
  {
    JWT_SECRET: { type: 'string', _parse: String },
    PORT: { type: 'number', _parse: Number },
    DB_HOST: { type: 'string', _parse: String },
    DB_PORT: { type: 'number', _parse: Number },
    DB_NAME: { type: 'string', _parse: String },
    DB_USERNAME: { type: 'string', _parse: String },
    DB_PASSWORD: { type: 'string', _parse: String },
    ADMIN_USERNAME: { type: 'string', _parse: String },
    ADMIN_PASSWORD: { type: 'string', _parse: String },
    NATS_CLUSTER_ID: { type: 'string', _parse: String },
    NATS_CLIENT_ID: { type: 'string', _parse: String },
    NATS_URL: { type: 'string', _parse: String },
    LOG_LEVEL: { type: 'string', _parse: String },
    ACCESS_TOKEN_EXPIRES_IN_SEC: { type: 'number', _parse: Number },
    REFRESH_TOKEN_EXPIRES_IN_SEC: { type: 'number', _parse: Number },
  },
  { dotEnvPath: null, strict: true },
)
