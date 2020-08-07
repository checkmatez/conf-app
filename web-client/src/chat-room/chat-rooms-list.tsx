import { CircularProgress, PseudoBox, Stack, StackProps } from '@chakra-ui/core'
import React from 'react'
import { useChatRoomsQuery } from '../generated/graphql'

interface ChatRoomsListProps extends StackProps {
  selectedChatId?: string
  onChatSelect: (chatId: string) => void
}

export const ChatRoomsList: React.FC<ChatRoomsListProps> = ({
  selectedChatId,
  onChatSelect,
  ...stackProps
}) => {
  const { data, loading } = useChatRoomsQuery({ context: { server: 'chat' } })

  if (loading) {
    return <CircularProgress isIndeterminate color="green"></CircularProgress>
  }

  return (
    <Stack flexDirection="column" spacing={2} {...stackProps}>
      {data?.chatRooms.nodes.map((chatRoom) => (
        <PseudoBox
          key={chatRoom.id}
          padding={2}
          borderRadius="md"
          backgroundColor={
            chatRoom.id === selectedChatId ? 'blue.200' : 'blue.100'
          }
          onClick={() => {
            onChatSelect(chatRoom.id)
          }}
          _hover={{ cursor: 'pointer', backgroundColor: 'blue.200' }}
        >
          {chatRoom.name}
        </PseudoBox>
      ))}
    </Stack>
  )
}
