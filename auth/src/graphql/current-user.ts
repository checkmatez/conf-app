import { extendType } from '@nexus/schema'
import { GraphqlContext } from '../context/get-context'
import { UserModel } from '../models/user-model'

export const CurrentUserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('currentUser', {
      type: 'User',
      resolve: async (_, __, { user }: GraphqlContext) => {
        const userInstance = await UserModel.query().findById(user!.userId)

        return userInstance
      },
    })
  },
})
