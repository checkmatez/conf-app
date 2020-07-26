import { Subject } from './subjects'

export interface UserSignedUpEvent {
  subject: Subject.UserSignedUp
  data: {
    id: string
    version: number
    username: string
    createdAt: string
    email?: string
  }
}
