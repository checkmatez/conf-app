import { createText } from '@shopify/restyle'
import React from 'react'
import { Theme } from '../config/theme'

export const BaseText = createText<Theme>()

export const Text = (props: React.ComponentProps<typeof BaseText>) => {
  return <BaseText variant="body" {...props} />
}
