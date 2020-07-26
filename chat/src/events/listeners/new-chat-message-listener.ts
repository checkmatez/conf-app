import { Subject } from '@checkmatez-conf/common'
import { Message, Stan, Subscription } from 'node-nats-streaming'
import { logger } from '../../logger/pino'

interface Event {
  subject: Subject
  data: any
}

export class NewChatMessageListener<T extends Event> {
  public constructor(client: Stan, subject: Subject) {
    this.subscribe = this.subscribe.bind(this)
    this.client = client
    this.subject = subject
  }

  private resolvers: ((value: T['data']) => void)[] = []
  private client: Stan
  private subject: Subject
  private activeSubscription?: Subscription

  public async onMessage(data: T['data'], msg: Message) {
    for (const resolver of this.resolvers) {
      resolver(data)
    }
    this.resolvers = []
  }

  public subscribe = async function* (
    this: NewChatMessageListener<T>,
  ): AsyncGenerator<T['data']> {
    if (!this.activeSubscription) {
      this.activeSubscription = this.client.subscribe(this.subject)
      this.activeSubscription.on('message', (msg: Message) => {
        logger.info(`Message received: ${this.subject}`)
        const parsedData = parseMessage(msg)
        this.onMessage(parsedData, msg)
      })
    }
    while (true) {
      yield new Promise<string>((resolve) => {
        this.resolvers.push(resolve)
      })
    }
  }
}

const parseMessage = (msg: Message) => {
  const data = msg.getData()
  return typeof data === 'string'
    ? JSON.parse(data)
    : JSON.parse(data.toString('utf8'))
}
