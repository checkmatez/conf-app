import { useTheme } from '@shopify/restyle'
import React from 'react'
import { View } from 'react-native'
import { Theme } from '../config/theme'
import { Box, BoxProps } from './box'

interface StackProps extends BoxProps {
  spacing?: keyof Theme['spacing']
}

export const Stack = React.forwardRef<View, StackProps>(
  ({ spacing = '4', flexDirection = 'column', children, ...boxProps }, ref) => {
    const marginProperty =
      flexDirection === 'column' ? 'marginTop' : 'marginLeft'
    const validChildren = React.Children.toArray(children).filter(
      React.isValidElement,
    )
    const theme = useTheme<Theme>()
    const marginValue = theme.spacing[spacing]

    return (
      <Box flexDirection={flexDirection} ref={ref} {...boxProps}>
        {validChildren.map((el, index) => {
          const isFirstChild = index === 0
          if (isFirstChild) {
            return el
          }
          const oldProps = el.props as any
          const newProps = {
            ...oldProps,
            style: [
              oldProps && oldProps.style,
              { [marginProperty]: marginValue },
            ],
          }
          const newEl = React.cloneElement(el, newProps)

          return newEl
        })}
      </Box>
    )
  },
)
