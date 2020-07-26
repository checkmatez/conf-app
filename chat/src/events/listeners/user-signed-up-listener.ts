import { Listener, Subject, UserSignedUpEvent } from '@checkmatez-conf/common'
import { Message } from 'node-nats-streaming'
import { UserModel } from '../../models/user-model'
import { QUEUE_GROUP_NAME } from '../queue-group-name'

export class UserSignedUpListener extends Listener<UserSignedUpEvent> {
  readonly subject = Subject.UserSignedUp
  queueGroupName = QUEUE_GROUP_NAME

  async onMessage(data: UserSignedUpEvent['data'], msg: Message) {
    await UserModel.query().insert({
      id: data.id,
      username: data.username,
      email: data.email,
      version: data.version,
    })

    msg.ack()
  }
}
