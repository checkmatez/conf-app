import { StyleSheet, ViewStyle } from 'react-native'
import { mainTheme } from '../config/themes'

export const cardStyle: ViewStyle = {
  flex: 1,
  alignItems: 'stretch',
  backgroundColor: mainTheme.grays.regular,
}

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
})
