import { InputArgErrorType, InputErrorInterface } from '@checkmatez-conf/common'
import { makeSchema, queryType } from '@nexus/schema'
import { join } from 'path'
import { AuthResultType } from './auth-result-type'
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

export const schema = makeSchema({
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
