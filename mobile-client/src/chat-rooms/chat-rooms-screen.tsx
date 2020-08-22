import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Box } from '../components/box'
import { Button } from '../components/button'
import { LogoutButton } from '../components/logout-button'
import { useChatRoomsQuery } from '../generated/graphql'

interface ChatRoomsScreenProps extends StackScreenProps<any> {}

export const ChatRoomsScreen: React.FC<ChatRoomsScreenProps> = ({
  navigation,
}) => {
  const { data, loading, refetch, error } = useChatRoomsQuery({
    context: { server: 'chat' },
  })
  const refreshControl = (
    <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
  )

  return (
    <Box flex={1}>
      <FlatList
        data={data?.chatRooms.nodes}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => navigation.navigate('ChatRoom', { roomId: item.id })}
          />
        )}
        keyExtractor={({ id }) => id}
        refreshControl={refreshControl}
      />
      <LogoutButton />
    </Box>
  )
}
