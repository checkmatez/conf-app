import { gql, useMutation } from '@apollo/client'
import { Button, Stack } from '@chakra-ui/core'
import { motion } from 'framer-motion'
import React from 'react'
import { useForm } from 'react-hook-form'
import { InputText } from '../components/input-text'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../config/constants'
import { currentUserQuery } from '../graphql/queries/current-user-query'

interface LoginResponse {
  login: {
    user: any
    accessToken: string
    refreshToken: string
  }
}

interface FormValues {
  email: string
  password: string
}

interface LoginFormProps {
  onSuccess?: () => void
}

const variants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, errors } = useForm<FormValues>()

  const [login, { loading }] = useMutation<LoginResponse>(
    gql`
      mutation {
        login(username: "max", password: "123") {
          ... on AuthResult {
            accessToken
            refreshToken
          }
          ... on InputError {
            code
            message
          }
        }
      }
    `,
    {
      refetchQueries: [{ query: currentUserQuery }],
      onCompleted: ({ login: { accessToken, refreshToken } }) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
        onSuccess?.()
      },
    },
  )

  const submitHandler = (values: FormValues) => {
    login({ variables: values })
  }

  return (
    <motion.div variants={variants} initial="hidden" animate="visible">
      <Stack
        as="form"
        onSubmit={handleSubmit(submitHandler)}
        direction="column"
        spacing={4}
        padding={4}
        borderRadius="lg"
        backgroundColor="white"
        minWidth="xs"
      >
        <InputText
          name="email"
          ref={register({ required: true })}
          label="Email"
          error={errors.email?.message}
          size="lg"
        />
        <InputText
          name="password"
          type="password"
          ref={register({ required: true })}
          label="Пароль"
          error={errors.password?.message}
          size="lg"
        />
        <Button
          type="submit"
          size="lg"
          variantColor="purple"
          isDisabled={loading}
        >
          Войти
        </Button>
      </Stack>
    </motion.div>
  )
}
