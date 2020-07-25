import { Model } from 'objection'
import { ENV } from './config/constants'
import { knex } from './database/knex'
import { server } from './server/server'
import { createAdminUserIfNotExist } from './services/create-admin-user-if-not-exist'

Model.knex(knex)

const start = async () => {
  await createAdminUserIfNotExist()

  server.listen({ port: ENV.PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

start()
