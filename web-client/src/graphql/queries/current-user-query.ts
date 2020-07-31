import { gql } from '@apollo/client'

export const currentUserQuery = gql`
  query {
    currentUser {
      id
      username
      email
      avatarUrl
      githubProfileUrl
    }
  }
`
