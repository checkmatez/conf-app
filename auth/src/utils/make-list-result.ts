import { objectType } from '@nexus/schema'

export const makeListResult = (name: string, type: string) =>
  objectType({
    name,
    definition(t) {
      t.int('total')
      t.list.field('nodes', { type })
    },
  })
