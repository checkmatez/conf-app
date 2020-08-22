import * as React from 'react'
import { ACCESS_TOKEN_KEY } from '../config/constants'
import { useItemFromAsyncStorage } from '../utils/async-storage'
import { createContext } from '../utils/create-context'

interface AuthenticationValue {
  isAuthenticated: boolean
  setAuthenticated: (value: boolean) => void
}

const [AuthenticationContextProvider, useAuthentication] = createContext<
  AuthenticationValue
>()

export { useAuthentication }

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = React.useState<boolean>(false)
  const [isLoading, accessToken] = useItemFromAsyncStorage(ACCESS_TOKEN_KEY)
  React.useEffect(() => {
    setAuthenticated(accessToken !== null)
  }, [accessToken])

  if (isLoading) {
    return null
  }

  return (
    <AuthenticationContextProvider
      value={{ isAuthenticated, setAuthenticated }}
    >
      {children}
    </AuthenticationContextProvider>
  )
}
