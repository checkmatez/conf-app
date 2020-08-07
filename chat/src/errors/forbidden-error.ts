import { BaseError } from './base-error'

export class ForbiddenError extends BaseError {
  public constructor(public message: string) {
    super(message)
  }

  public statusCode = 403

  public serializeErrors() {
    return { errors: [{ message: this.message }] }
  }
}
