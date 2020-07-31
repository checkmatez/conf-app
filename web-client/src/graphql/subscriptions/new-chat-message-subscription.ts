import { gql } from '@apollo/client'

export const chatMessageAddedSubscription = gql`
  subscription messageAdded($chatRoomId: ID!) {
    chatMessageAdded(chatRoomId: $chatRoomId) {
      id
      text
    }
  }
`
