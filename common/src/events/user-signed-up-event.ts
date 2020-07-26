import { Subject } from './subjects'

export interface UserSignedUpEvent {
  subject: Subject.UserSignedUp
  data: {
    id: string
    username: string
    email?: string
  }
}
