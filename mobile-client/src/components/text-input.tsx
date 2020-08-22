// import {
//   BaseTheme,
//   color,
//   ColorProps,
//   createRestyleComponent,
//   createVariant,
//   opacity,
//   OpacityProps,
//   RestyleFunctionContainer,
//   spacing,
//   SpacingProps,
//   spacingShorthand,
//   SpacingShorthandProps,
//   textShadow,
//   TextShadowProps,
//   typography,
//   TypographyProps,
//   VariantProps,
//   visible,
//   VisibleProps,
// } from '@shopify/restyle'
// import React from 'react'
// import { TextInput as TextInputRN } from 'react-native-gesture-handler'

// type BaseTextProps<Theme extends BaseTheme> = ColorProps<Theme> &
//   OpacityProps<Theme> &
//   VisibleProps<Theme> &
//   TypographyProps<Theme> &
//   SpacingProps<Theme> &
//   TextShadowProps<Theme> &
//   VariantProps<Theme, 'textVariants'>

// export type TextProps<
//   Theme extends BaseTheme,
//   EnableShorthand extends boolean = true
// > = EnableShorthand extends true
//   ? BaseTextProps<Theme> & SpacingShorthandProps<Theme>
//   : BaseTextProps<Theme>

// export const textRestyleFunctions = [
//   color,
//   opacity,
//   visible,
//   typography,
//   spacing,
//   spacingShorthand,
//   textShadow,
//   createVariant({ themeKey: 'textVariants' }),
// ]

// const createText = <
//   Theme extends BaseTheme,
//   Props = React.ComponentProps<typeof TextInputRN> & {
//     children?: React.ReactNode
//   },
//   EnableShorthand extends boolean = true
// >(
//   BaseComponent: React.ComponentType<any> = Text,
// ) => {
//   return createRestyleComponent<
//     TextProps<Theme, EnableShorthand> &
//       Omit<Props, keyof TextProps<Theme, EnableShorthand>>,
//     Theme
//   >(
//     textRestyleFunctions as RestyleFunctionContainer<
//       TextProps<Theme, EnableShorthand>,
//       Theme
//     >[],
//     BaseComponent,
//   )
// }

// const TextInput = createText(TextInputRN)

// export default createText
