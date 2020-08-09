import { GraphQLError } from 'graphql'

export class AuthenticationError extends GraphQLError {
  public constructor(msg: string) {
    super(msg, undefined, undefined, undefined, undefined, undefined, {
      code: 'UNAUTHENTICATED',
    })
  }
}
