import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Box } from '../components/box'
import { Text } from '../components/text'

interface ChatRoomScreenProps extends StackScreenProps<any> {}

export const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <Box>
      <Text>{route.params!.roomId}</Text>
    </Box>
  )
}
