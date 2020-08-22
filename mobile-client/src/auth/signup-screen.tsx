import { StackScreenProps } from '@react-navigation/stack'
import { useTheme } from '@shopify/restyle'
import React from 'react'
import { AsyncStorage } from 'react-native'
import { Box } from '../components/box'
import { Button } from '../components/button'
import { Stack } from '../components/stack'
import { Text, TextInput } from '../components/text'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../config/constants'
import { Theme } from '../config/theme'
import { useSignupMutation } from '../generated/graphql'
import { useAuthentication } from '../hooks/use-is-authentication'

interface SignupScreenProps extends StackScreenProps<any> {}

export const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const { setAuthenticated } = useAuthentication()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const theme = useTheme<Theme>()

  const [signup, { loading }] = useSignupMutation({
    onCompleted: async ({ signup }) => {
      if (signup.__typename === 'SignupError') {
        alert(signup.message)
      } else if (signup.__typename === 'AuthResult') {
        await AsyncStorage.multiSet([
          [ACCESS_TOKEN_KEY, signup.accessToken],
          [REFRESH_TOKEN_KEY, signup.refreshToken],
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
        title="Зарегистрироваться"
        onPress={() => signup({ variables: { username: email, password } })}
      />
      {/* {loading && (
        <ActivityIndicator size="large" color={theme.colors.primaryText} />
      )} */}
    </Stack>
  )
}
