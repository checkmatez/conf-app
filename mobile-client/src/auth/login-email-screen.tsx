import { useTheme } from '@shopify/restyle'
import React from 'react'
import { ActivityIndicator, AsyncStorage } from 'react-native'
import { Box } from '../components/box'
import { Button } from '../components/button'
import { Stack } from '../components/stack'
import { Text } from '../components/text'
import { TextInput } from '../components/text-input'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../config/constants'
import { Theme } from '../config/theme'
import { useLoginMutation } from '../generated/graphql'
import { useAuthentication } from '../hooks/use-is-authentication'

export const LoginEmailScreen = () => {
  const { setAuthenticated } = useAuthentication()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const theme = useTheme<Theme>()

  const [login, { loading }] = useLoginMutation({
    onCompleted: async ({ login }) => {
      if (login.__typename === 'LoginError') {
        alert(login.message)
      } else if (login.__typename === 'AuthResult') {
        await AsyncStorage.multiSet([
          [ACCESS_TOKEN_KEY, login.accessToken],
          [REFRESH_TOKEN_KEY, login.refreshToken],
        ])
        setAuthenticated(true)
      }
    },
  })

  return (
    <Stack
      flexDirection="column"
      alignItems="stretch"
      flex={1}
      marginHorizontal="5"
      marginVertical="5"
    >
      <Box>
        <Text variant="subheader">Email</Text>
        <TextInput
          defaultValue={email}
          onChangeText={(val) => setEmail(val)}
          variant="subheader"
        />
      </Box>
      <Box>
        <Text variant="subheader">Password</Text>
        <TextInput
          defaultValue={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry
          variant="subheader"
        />
      </Box>
      <Button
        title="Войти"
        onPress={() => login({ variables: { username: email, password } })}
      />
      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primaryText} />
      )}
    </Stack>
  )
}
