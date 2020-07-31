import { useSubscription } from '@apollo/client'
import { Flex, Text } from '@chakra-ui/core'
import React from 'react'
import { chatMessageAddedSubscription } from '../graphql/subscriptions/new-chat-message-subscription'

interface ChatMessagesProps {}

export const ChatMessages: React.FC<ChatMessagesProps> = ({}) => {
  const { data, loading } = useSubscription(chatMessageAddedSubscription, {
    variables: { chatRoomId: 'f4abb98a-e5d3-4e9a-b57c-04456ae83192' },
  })
  console.log('data', data)

  return (
    <Flex>
      <Text>{data?.chatMessageAdded.text}</Text>
    </Flex>
  )
}
