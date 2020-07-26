import { Subject } from './subjects'

export interface NewChatMessageEvent {
  subject: Subject.NewChatMessage
  data: {
    id: string
    version: number
    text: string
    chatRoom: {
      id: string
      name: string
    }
    author: {
      id: string
      username: string
      avatarUrl?: string
    }
  }
}
