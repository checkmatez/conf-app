import { Model } from 'objection'
import { ENV } from './config/constants'
import { knex } from './database/knex'
import { natsWrapper } from './nats/nats-wrapper'
import { server } from './server/server'
import { createAdminUserIfNotExist } from './services/create-admin-user-if-not-exist'

Model.knex(knex)

const start = async () => {
  await createAdminUserIfNotExist()

  await natsWrapper.connect(
    ENV.NATS_CLUSTER_ID,
    ENV.NATS_CLIENT_ID,
    ENV.NATS_URL,
  )
  natsWrapper.client.on('close', () => {
    console.log('Connection to NATS closed.')
    process.exit()
  })

  server.listen({ port: ENV.PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

start()
