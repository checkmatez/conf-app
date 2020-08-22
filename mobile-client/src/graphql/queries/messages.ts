import { gql } from '@apollo/client'

export const messagesQuery = gql`
  query messages($chatRoomId: ID!, $page: Int, $pageSize: Int) {
    messages(chatRoomId: $chatRoomId, page: $page, pageSize: $pageSize) {
      total
      nodes {
        id
        text
      }
    }
  }
`
