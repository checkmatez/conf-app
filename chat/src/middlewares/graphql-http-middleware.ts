import { execute, GraphQLSchema, parse } from 'graphql'
import { Context, Next } from 'koa'

interface GraphqlHttpMiddlewareOptions {
  schema: GraphQLSchema
  rootValue?: any
  getContext: (ctx: Context) => Promise<any>
}

export const graphqlHttpMiddleware = ({
  schema,
  rootValue,
  getContext,
}: GraphqlHttpMiddlewareOptions) => async (ctx: Context, next: Next) => {
  const { operationName, query, variables } = ctx.request.body

  const document = parse(query)
  const context = await getContext(ctx)
  const result = await execute({
    schema,
    document,
    rootValue,
    contextValue: context,
    variableValues: variables,
  })

  ctx.response.status = 200
  ctx.response.body = result

  return await next()
}
