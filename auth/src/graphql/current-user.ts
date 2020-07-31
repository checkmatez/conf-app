import { extendType } from '@nexus/schema'
import { UserModel } from '../models/user-model'
import { GraphqlContext } from '../server/get-context'

export const CurrentUserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('currentUser', {
      type: 'User',
      nullable: true,
      resolve: async (_, __, { user }: GraphqlContext) => {
        if (!user) {
          return null
        }
        const userInstance = await UserModel.query().findById(user.userId)

        return userInstance
      },
    })
  },
})
