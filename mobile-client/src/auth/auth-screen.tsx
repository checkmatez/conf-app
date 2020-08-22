import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Box } from '../components/box'
import { Button } from '../components/button'
import { Stack } from '../components/stack'
import { useAuthentication } from '../hooks/use-is-authentication'

interface AuthScreenProps extends StackScreenProps<any> {}

export const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const { setAuthenticated } = useAuthentication()

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex={1}
    >
      <Stack style={{ marginTop: -100 }}>
        <Button
          title="Войти"
          onPress={() => navigation.navigate('LoginByEmail')}
        />
        <Button
          title="Зарегистрироваться"
          onPress={() => navigation.navigate('Signup')}
        />
        <Button
          title="Войти с Github"
          onPress={() => navigation.navigate('LoginGithub')}
        />
      </Stack>
    </Box>
  )
}
