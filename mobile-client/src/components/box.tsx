import { createBox } from '@shopify/restyle'
import React from 'react'
import { Theme } from '../config/theme'

export const Box = createBox<Theme>()

export type BoxProps = React.ComponentProps<typeof Box>
