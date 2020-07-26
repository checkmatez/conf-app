import {
  NewChatMessageEvent,
  Publisher,
  Subject,
} from '@checkmatez-conf/common'

export class NewChatMessagePublisher extends Publisher<NewChatMessageEvent> {
  readonly subject = Subject.NewChatMessage
}
