import { Flex } from '@chakra-ui/core'
import React from 'react'
import { ChatRoomsList } from '../chat-room/chat-rooms-list'
import { MessagesList } from '../messages-list/messages-list'

interface MessagesByChatProps {}

export const MessagesByChat: React.FC<MessagesByChatProps> = () => {
  const [selectedChatId, setSelectedChatId] = React.useState<
    string | undefined
  >(undefined)

  return (
    <Flex flex={1} flexDirection="row" justifyContent="space-between">
      <ChatRoomsList
        selectedChatId={selectedChatId}
        onChatSelect={setSelectedChatId}
        flex={1}
      />
      {selectedChatId ? (
        <MessagesList chatRoomId={selectedChatId} flex={1} marginLeft={4} />
      ) : (
        <Flex flex={1} marginLeft={4} />
      )}
    </Flex>
  )
}
