import { interfaceType, objectType } from '@nexus/schema'

export const InputErrorInterface = interfaceType({
  name: 'InputError',
  definition(t) {
    t.string('code')
    t.string('message')
    t.list.field('argErrors', { type: 'InputArgError' })
    t.resolveType(() => null)
  },
})

export const InputArgErrorType = objectType({
  name: 'InputArgError',
  definition(t) {
    t.string('argName')
    t.string('message')
  },
})
