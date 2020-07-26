import { Context, Next } from 'koa'
import { BaseError } from '../errors/base-error'

export const errorHandlerMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (error) {
    ctx.logger.error(error)
    if (error instanceof BaseError) {
      ctx.response.status = error.statusCode
      ctx.response.body = error.serializeErrors()
      return
    }

    ctx.response.status = 500
    ctx.response.body = {
      errors: [{ message: 'Something went wrong' }],
    }
  }
}
