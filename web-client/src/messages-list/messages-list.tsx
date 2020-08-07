import { Flex, Stack, Text } from '@chakra-ui/core'
import React from 'react'
import {
  MessageAddedSubscription,
  MessageAddedSubscriptionVariables,
  useMessagesQuery,
} from '../generated/graphql'
import { chatMessageAddedSubscription } from '../graphql/subscriptions/new-chat-message-subscription'

interface MessagesListProps {
  chatRoomId: string
}

export const MessagesList: React.FC<MessagesListProps> = ({ chatRoomId }) => {
  const { data, loading, subscribeToMore } = useMessagesQuery({
    variables: { chatRoomId },
    context: { server: 'chat' },
  })

  React.useEffect(
    () =>
      subscribeToMore<
        MessageAddedSubscription,
        MessageAddedSubscriptionVariables
      >({
        document: chatMessageAddedSubscription,
        variables: { chatRoomId },
        context: { server: 'chat' },
        updateQuery: (prev, { subscriptionData }) => {
          return {
            ...prev,
            messages: {
              ...prev.messages,
              nodes: [
                subscriptionData.data.chatMessageAdded,
                ...prev.messages.nodes,
              ],
            },
          }
        },
      }),
    [chatRoomId],
  )

  return (
    <Stack flexDirection="column" spacing={2}>
      {data?.messages.nodes.map((message) => (
        <Flex key={message.id}>
          <Text>{message.text}</Text>
        </Flex>
      ))}
    </Stack>
  )
}
