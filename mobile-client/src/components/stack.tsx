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

    return (
      <Box flexDirection={flexDirection} ref={ref} {...boxProps}>
        {validChildren.map((el, index) => {
          const isFirstChild = index === 0
          if (isFirstChild) {
            return el
          }

          const newProps = { ...(el.props as any), [marginProperty]: spacing }
          const newEl = React.cloneElement(el, newProps)

          return newEl
        })}
      </Box>
    )
  },
)
