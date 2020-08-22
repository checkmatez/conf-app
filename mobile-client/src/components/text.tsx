import { createText } from '@shopify/restyle'
import React from 'react'
import { TextInput as TextInputRN } from 'react-native-gesture-handler'
import { Theme } from '../config/theme'

export const BaseText = createText<Theme>()

export const Text = (props: React.ComponentProps<typeof BaseText>) => {
  return <BaseText variant="body" {...props} />
}

export const BaseTextInput = createText<
  Theme,
  React.ComponentProps<typeof TextInputRN>
>(TextInputRN)

export const TextInput = (
  props: React.ComponentProps<typeof BaseTextInput>,
) => {
  return <BaseTextInput variant="body" {...props} />
}
