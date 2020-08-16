import Router from 'koa-router'
import { createProbeMiddleware } from '../middlewares/probe-middleware'
import * as liveness from '../probes/liveness'
import * as readiness from '../probes/readiness'

export const healthChecksRouter = new Router()

healthChecksRouter.get(
  '/liveness',
  createProbeMiddleware({ getStatus: liveness.getStatus }),
)

healthChecksRouter.get(
  '/readiness',
  createProbeMiddleware({ getStatus: readiness.getStatus }),
)
