import { RelationMappings } from 'objection'
import { BaseModel } from './base-model'

export class ChatRoomModel extends BaseModel {
  public static tableName = 'chat_rooms'

  public static relationMappings: RelationMappings = {}

  public name!: string
}
