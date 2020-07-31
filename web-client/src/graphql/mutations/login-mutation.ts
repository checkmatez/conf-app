import { gql } from '@apollo/client'

export const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on AuthResult {
        accessToken
        refreshToken
      }
      ... on InputError {
        code
        message
      }
    }
  }
`
