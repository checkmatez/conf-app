import { Context, Next } from 'koa'

interface ProbeOptions {
  getStatus: () => boolean
  okCode?: number
  okBody?: string
  failureCode?: number
  failureBody?: string
}

export const createProbeMiddleware = ({
  getStatus,
  okCode = 200,
  okBody = 'OK',
  failureCode = 503,
  failureBody = 'Service Unavailable',
}: ProbeOptions) => {
  const probeMiddleware = async (ctx: Context, next: Next) => {
    if (getStatus()) {
      ctx.response.status = okCode
      ctx.response.body = okBody
    } else {
      ctx.response.status = failureCode
      ctx.response.body = failureBody
    }

    return await next()
  }

  return probeMiddleware
}
