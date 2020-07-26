import { Publisher, Subject, UserSignedUpEvent } from '@checkmatez-conf/common'

export class UserSignedUpPublisher extends Publisher<UserSignedUpEvent> {
  readonly subject = Subject.UserSignedUp
}
