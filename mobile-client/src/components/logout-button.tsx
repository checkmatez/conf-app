import React from 'react'
import { AsyncStorage } from 'react-native'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../config/constants'
import { useAuthentication } from '../hooks/use-is-authentication'
import { Button } from './button'

export const LogoutButton = () => {
  const { setAuthenticated } = useAuthentication()

  const handleLogout = async (): Promise<void> => {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY])
    setAuthenticated(false)
  }

  return <Button title="Выйти" onPress={handleLogout} />
}
