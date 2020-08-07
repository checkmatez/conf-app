import { gql } from '@apollo/client'

export const chatRoomsQuery = gql`
  query chatRooms($page: Int, $pageSize: Int) {
    chatRooms(page: $page, pageSize: $pageSize) {
      total
      nodes {
        id
        name
      }
    }
  }
`
