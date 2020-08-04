import { Flex } from '@chakra-ui/core'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoginForm } from './login-form'

interface LocationState {
  from?: string
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleSuccess = () => {
    navigate((location.state as LocationState)?.from ?? '/')
  }

  return (
    <Flex
      minHeight="100vh"
      minWidth="100vw"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.100"
    >
      <LoginForm onSuccess={handleSuccess} />
    </Flex>
  )
}
