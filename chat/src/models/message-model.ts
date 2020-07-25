import { Model, RelationMappings } from 'objection'
import { BaseModel } from './base-model'
import { ChatRoomModel } from './chat-room-model'
import { UserModel } from './user-model'

export class MessageModel extends BaseModel {
  public static tableName = 'messages'

  public static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'messages.author_id',
        to: 'users.id',
      },
    },
    chatRoom: {
      relation: Model.BelongsToOneRelation,
      modelClass: ChatRoomModel,
      join: {
        from: 'messages.chat_room_id',
        to: 'chat_rooms.id',
      },
    },
  }

  public text!: string

  public author!: UserModel
  public authorId!: string
  public chatRoom!: ChatRoomModel
  public chatRoomId!: string
}
