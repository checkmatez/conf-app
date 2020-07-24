import { Model, RelationMappings } from 'objection'
import { BaseModel } from './base-model'
import { UserModel } from './user-model'

export class RefreshTokenModel extends BaseModel {
  public static tableName = 'refresh_tokens'

  public static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'refresh_tokens.user_id',
        to: 'users.id',
      },
    },
  }

  public jti!: string
  public expiredAt!: Date
  public usedAt?: Date
  public revokedAt?: Date

  public user!: UserModel
}
