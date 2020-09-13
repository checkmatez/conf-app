import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Box } from '../components/box'
import { Text } from '../components/text'
import {
  MessageAddedSubscription,
  MessageAddedSubscriptionVariables,
  useMessagesQuery,
} from '../generated/graphql'
import { chatMessageAddedSubscription } from '../graphql/subscriptions/new-chat-message-subscription'
import { MessageBubble } from './message-bubble'
import { MessageEditor } from './message-editor'

interface ChatRoomScreenProps extends StackScreenProps<any> {}

export const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({
  navigation,
  route,
}) => {
  const roomId = route.params!.roomId
  const { subscribeToMore, refetch, data, networkStatus } = useMessagesQuery({
    variables: { chatRoomId: roomId },
    notifyOnNetworkStatusChange: true,
    context: { server: 'chat' },
  })

  const scrollRef = React.useRef<any>(null)

  React.useEffect(() => {
    return subscribeToMore<
      MessageAddedSubscription,
      MessageAddedSubscriptionVariables
    >({
      document: chatMessageAddedSubscription,
      variables: { chatRoomId: roomId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollToEnd()
          }
        }, 500)
        const newMessage = subscriptionData.data.chatMessageAdded

        return {
          ...prev,
          messages: {
            ...prev.messages,
            nodes: [...prev.messages.nodes, newMessage],
          },
        }
      },
      context: { server: 'chat' },
    })
  }, [roomId])

  const keyExtractor = (message: any) => message.id

  const refreshControl = (
    <RefreshControl
      enabled
      refreshing={networkStatus === 4}
      onRefresh={refetch}
    />
  )

  const listEmpty = () => (
    <Box>
      <Text>Это начало чата</Text>
    </Box>
  )

  return (
    <Box flex={1} paddingHorizontal="4" paddingVertical="4">
      <FlatList
        data={data?.messages.nodes ?? []}
        renderItem={({ item }) => (
          <MessageBubble id={item.id} text={item.text} sentAt={new Date()} />
        )}
        keyExtractor={keyExtractor}
        refreshControl={refreshControl}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={{ paddingTop: 10 }}
        ref={scrollRef}
      />
      <MessageEditor chatRoomId={roomId} />
    </Box>
  )
}
