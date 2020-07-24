import { ENV } from './config/constants'
import { server } from './server/server'

server.listen({ port: ENV.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
