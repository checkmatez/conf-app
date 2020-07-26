import { RelationMappings } from 'objection'
import { BaseModel } from './base-model'

export class UserModel extends BaseModel {
  public static tableName = 'users'

  public static relationMappings: RelationMappings = {}

  public version!: number
  public username!: string
  public password!: string
  public email!: string
  public avatarUrl!: string
}
