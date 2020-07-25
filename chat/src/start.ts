import { Model } from 'objection'
import { ENV } from './config/constants'
import { knex } from './database/knex'
import { server } from './server/server'

Model.knex(knex)

server.listen({ port: ENV.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
  console.log(`Woohoo`)
})
