import { InputArgErrorType, InputErrorInterface } from '@checkmatez-conf/common'
import { makeSchema, queryType } from '@nexus/schema'
import { applyMiddleware } from 'graphql-middleware'
import { join } from 'path'
import { permissions } from '../permissions/permissions'
import { AuthResultType } from './auth-result-type'
import { CurrentUserQuery } from './current-user'
import {
  GenerateTokensError,
  GenerateTokensMutation,
  GenerateTokensResponseType,
} from './generate-tokens-mutation'
import { LoginErrorType, LoginMutation, LoginResponseType } from './login'
import { SignupErrorType, SignupMutation, SignupResponseType } from './signup'
import { QueryUsers, UsersResultType, UserType } from './user-type'

const Query = queryType({
  definition(t) {
    t.string('serviceDescription', { resolve: () => 'Authorization service' })
  },
})

export const schemaWithoutMiddlewares = makeSchema({
  types: [
    Query,
    InputArgErrorType,
    InputErrorInterface,
    UserType,
    CurrentUserQuery,
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

export const schema = applyMiddleware(schemaWithoutMiddlewares, permissions)
