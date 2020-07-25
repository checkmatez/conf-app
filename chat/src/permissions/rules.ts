import { rule } from 'graphql-shield'
import { GraphqlContext } from '../server/context'
import { UserRole } from '../utils/access-token-payload'

export const isAuthenticated = rule()(
  async (parent, args, { user }: GraphqlContext) => user !== null,
)

export const isAdmin = rule()(
  async (parent, args, { user }: GraphqlContext) =>
    user?.role === UserRole.Admin,
)

export const isAttendee = rule()(
  async (parent, args, { user }: GraphqlContext) =>
    user?.role === UserRole.Attendee,
)
