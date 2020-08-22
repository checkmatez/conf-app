import { gql } from '@apollo/client'

export const signupMutation = gql`
  mutation signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
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
