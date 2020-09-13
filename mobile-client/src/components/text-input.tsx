import {
  backgroundColor,
  BackgroundColorProps,
  backgroundColorShorthand,
  BackgroundColorShorthandProps,
  BaseTheme,
  border,
  BorderProps,
  color,
  ColorProps,
  createRestyleComponent,
  createVariant,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  spacing,
  SpacingProps,
  spacingShorthand,
  SpacingShorthandProps,
  textShadow,
  TextShadowProps,
  typography,
  TypographyProps,
  VariantProps,
  visible,
  VisibleProps,
} from '@shopify/restyle'
import React from 'react'
import { TextInput as TextInputRN } from 'react-native-gesture-handler'
import { Theme } from '../config/theme'

type BoxProps<Theme extends BaseTheme> = BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme> &
  SpacingShorthandProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  ColorProps<Theme> &
  TypographyProps<Theme> &
  TextShadowProps<Theme> &
  VariantProps<Theme, 'textVariants'>

export const boxRestyleFunctions = [
  backgroundColor,
  backgroundColorShorthand,
  opacity,
  visible,
  layout,
  spacing,
  spacingShorthand,
  border,
  shadow,
  position,
  color,
  typography,
  textShadow,
  createVariant({ themeKey: 'textVariants' }),
]

export const BaseTextInput = createRestyleComponent<
  BoxProps<Theme> &
    Omit<React.ComponentProps<typeof TextInputRN>, keyof BoxProps<Theme>>,
  Theme
>(boxRestyleFunctions, TextInputRN)

export const TextInput = (
  props: React.ComponentProps<typeof BaseTextInput>,
) => {
  return <BaseTextInput variant="body" {...props} />
}
