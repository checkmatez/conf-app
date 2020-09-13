import { createTheme } from '@shopify/restyle'

const palette = {
  black: 'hsl(0, 0%, 4%)',
  white: 'hsl(200, 11%, 95%)',

  grayLight: 'hsl(0, 0%, 75%)',
  grayPrimary: 'hsl(0, 0%, 50%)',
  grayDark: 'hsl(0, 0%, 20%)',

  purpleLight: 'hsl(253, 89%, 70%)',
  purplePrimary: 'hsl(253, 90%, 57%)',
  purpleDark: 'hsl(253, 67%, 40%)',

  greenLight: 'hsl(165, 66%, 60%)',
  greenPrimary: 'hsl(165, 87%, 43%)',
  greenDark: 'hsl(165, 87%, 30%)',
}

export const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,

    primaryBackground: palette.purpleDark,
    secondaryBackground: palette.grayLight,

    primaryText: palette.black,
    secondaryText: palette.white,
  },
  spacing: {
    '0': 0,
    '1': 4,
    '2': 8,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '8': 32,
    '10': 40,
    '12': 48,
    '16': 64,
    '20': 80,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  borderRadii: {
    '0': 0,
    '1': 5,
    '2': 10,
  },
  zIndices: {
    regular: 1,
    modal: 99,
  },
  textVariants: {
    header: {
      fontFamily: 'System',
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'primaryText',
    },
    subheader: {
      fontFamily: 'System',
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'primaryText',
    },
    body: {
      fontFamily: 'System',
      fontSize: 16,
      lineHeight: 24,
      color: 'primaryText',
    },
  },
})

export type Theme = typeof theme

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,

    primaryBackground: palette.purpleDark,
    secondaryBackground: palette.grayDark,

    primaryText: palette.white,
    secondaryText: palette.black,
  },
}
