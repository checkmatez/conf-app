import * as React from 'react'
import { AsyncStorage, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Box } from '../components/box'
import { Text } from '../components/text'
import { SHOW_ONBOARDING_KEY } from '../config/constants'
import { useOnboarding } from '../hooks/use-show-onboarding'

export const OnboardingScreen = () => {
  const { setShowOnboarding } = useOnboarding()

  const handleTap = async (): Promise<void> => {
    await AsyncStorage.setItem(SHOW_ONBOARDING_KEY, 'false')
    setShowOnboarding(false)
  }

  return (
    <Box>
      <Text variant="header">Onboarding</Text>
      <RectButton onPress={handleTap}>
        <View accessible>
          <Text>Просмотрено</Text>
        </View>
      </RectButton>
    </Box>
  )
}
