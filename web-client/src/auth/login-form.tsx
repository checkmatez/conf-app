import { Button, Stack } from '@chakra-ui/core'
import { motion } from 'framer-motion'
import React from 'react'
import { useForm } from 'react-hook-form'
import { InputText } from '../components/input-text'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../config/constants'
import { useLoginMutation } from '../generated/graphql'

interface LoginResponse {
  login: {
    user: any
    accessToken: string
    refreshToken: string
  }
}

interface FormValues {
  username: string
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

  const [login, { loading }] = useLoginMutation({
    onCompleted: ({ login }) => {
      if (login.__typename === 'LoginError') {
        alert(login.message)
      } else if (login.__typename === 'AuthResult') {
        localStorage.setItem(ACCESS_TOKEN_KEY, login.accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, login.refreshToken)
        onSuccess?.()
      }
    },
  })

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
          name="username"
          ref={register({ required: true })}
          label="Имя пользователя"
          error={errors.username?.message}
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
