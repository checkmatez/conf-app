import { makeSchema, queryType } from '@nexus/schema'
import { ApolloServer } from 'apollo-server'
import Knex from 'knex'
import { Model } from 'objection'
import { join } from 'path'
import { ENV } from './config/constants'
import { AuthResultType } from './graphql/auth-result-type'
import {
  GenerateTokensError,
  GenerateTokensMutation,
  GenerateTokensResponseType,
} from './graphql/generate-tokens-mutation'
import {
  LoginErrorType,
  LoginMutation,
  LoginResponseType,
} from './graphql/login'
import {
  SignupErrorType,
  SignupMutation,
  SignupResponseType,
} from './graphql/signup'
import { QueryUsers, UsersResultType, UserType } from './graphql/user-type'
import { InputArgErrorType, InputErrorInterface } from './utils/input-error'

const Query = queryType({
  definition(t) {
    t.string('serviceDescription', { resolve: () => 'Authorization service' })
  },
})

const schema = makeSchema({
  types: [
    Query,
    InputArgErrorType,
    InputErrorInterface,
    UserType,
    QueryUsers,
    UsersResultType,
    AuthResultType,
    SignupMutation,
    SignupResponseType,
    SignupErrorType,
    LoginMutation,
    LoginResponseType,
    LoginErrorType,
    GenerateTokensMutation,
    GenerateTokensResponseType,
    GenerateTokensError,
  ],
  outputs: {
    schema: join(__dirname, 'generated', 'schema.graphql'),
    typegen: join(__dirname, 'generated', 'types.ts'),
  },
})

const knex = Knex({
  client: 'pg',
  version: '11.2',
  connection: {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    database: ENV.DB_NAME,
    user: ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
  },
  searchPath: ['knex', 'public'],
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './seeds',
  },
  debug: true,
  asyncStackTraces: true,
})
Model.knex(knex)

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
