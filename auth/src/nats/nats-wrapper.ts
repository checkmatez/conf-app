import nats, { Stan } from 'node-nats-streaming'
import { logger } from '../logger/pino'

class NatsWrapper {
  private _client?: Stan

  get client(): Stan {
    if (!this._client) {
      throw new Error('NATS client not initialized.')
    }
    return this._client
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url })

    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        logger.info('Connected to NATS')
        resolve()
      })
      this.client.on('error', (err) => reject(err))
    })
  }
}

export const natsWrapper = new NatsWrapper()
