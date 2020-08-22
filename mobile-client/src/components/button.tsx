import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { Box, BoxProps } from './box'
import { Text } from './text'

interface ButtonProps extends BoxProps {
  title: string
  disabled?: boolean
  onPress: () => void
}

export const Button = ({
  title,
  onPress,
  disabled = false,
  ...boxProps
}: ButtonProps) => {
  const innerElement = (
    <Box
      accessible
      backgroundColor="primaryBackground"
      borderRadius="1"
      paddingHorizontal="4"
      paddingVertical="3"
      {...boxProps}
    >
      <Text variant="subheader">{title}</Text>
    </Box>
  )

  if (disabled) {
    return innerElement
  }

  return <RectButton onPress={onPress}>{innerElement}</RectButton>
}
