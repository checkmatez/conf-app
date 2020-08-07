import { gql } from '@apollo/client'

export const addChatMessageMutation = gql`
  mutation addChatMessage($text: String!, $chatRoomId: ID!) {
    addChatMessage(text: $text, chatRoomId: $chatRoomId) {
      id
      text
    }
  }
`
