import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { useColorScheme } from 'react-native'
import { AuthScreen } from './auth/auth-screen'
import { SignupScreen } from './auth/signup-screen'
import { ChatRoomScreen } from './chat-room/chat-room-screen'
import { ChatRoomsScreen } from './chat-rooms/chat-rooms-screen'
import { useAuthentication } from './hooks/use-is-authentication'
import { useOnboarding } from './hooks/use-show-onboarding'
import { OnboardingScreen } from './onboarding/onboarding-screen'

const ModalStack = createStackNavigator()

const MainStack = createStackNavigator()

const MainStackNavigation = () => {
  const { showOnboarding } = useOnboarding()
  const { isAuthenticated } = useAuthentication()

  if (showOnboarding) {
    return (
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Onboarding" component={OnboardingScreen} />
      </MainStack.Navigator>
    )
  }

  if (!isAuthenticated) {
    return (
      <MainStack.Navigator initialRouteName="Auth">
        <MainStack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen name="Signup" component={SignupScreen} />
      </MainStack.Navigator>
    )
  }

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="ChatRooms"
        component={ChatRoomsScreen}
        options={{ title: 'Доклады' }}
      />
      <MainStack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{ title: 'Чат' }}
      />
    </MainStack.Navigator>
  )
}

export const Main = () => {
  const scheme = useColorScheme()

  return (
    <NavigationContainer theme={scheme === 'light' ? DefaultTheme : DarkTheme}>
      <ModalStack.Navigator
        initialRouteName="Main"
        mode="modal"
        screenOptions={{ headerShown: false }}
      >
        <ModalStack.Screen name="Main" component={MainStackNavigation} />
      </ModalStack.Navigator>
    </NavigationContainer>
  )
}
