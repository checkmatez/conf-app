import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/core'
import React from 'react'

interface InputTextProps extends InputProps {
  label: string
  name: string
  error?: string
}

export const InputText: React.FC<InputTextProps> = React.forwardRef(
  ({ label, name, error, ...inputProps }, ref) => {
    return (
      <FormControl>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input
          focusBorderColor="purple.300"
          ref={ref}
          id={name}
          name={name}
          isInvalid={!!error}
          {...inputProps}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    )
  },
)
