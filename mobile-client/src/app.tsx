import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@shopify/restyle'
import { AppLoading } from 'expo'
import * as React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { AppearanceProvider } from 'react-native-appearance'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { apolloClient } from './client/apollo-client'
import { darkTheme, theme } from './config/theme'
import { AuthenticationProvider } from './hooks/use-is-authentication'
import { OnboardingProvider } from './hooks/use-show-onboarding'
import { Main } from './main'
import { useAssetsPreloading } from './utils/assets'

const WithAppearanceThemeProvider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider theme={colorScheme === 'light' ? theme : darkTheme}>
      {children}
    </ThemeProvider>
  )
}

export const App = () => {
  const assetsReady = useAssetsPreloading()

  if (!assetsReady) {
    return <AppLoading />
  }

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <AppearanceProvider>
          <WithAppearanceThemeProvider>
            <OnboardingProvider>
              <AuthenticationProvider>
                <StatusBar barStyle="light-content" />
                <Main />
              </AuthenticationProvider>
            </OnboardingProvider>
          </WithAppearanceThemeProvider>
        </AppearanceProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
