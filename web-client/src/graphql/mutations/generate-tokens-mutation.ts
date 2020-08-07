import { gql } from '@apollo/client'

export const generateTokensMutation = gql`
  mutation generateTokens($refreshToken: String!) {
    generateTokens(refreshToken: $refreshToken) {
      __typename
      ... on AuthResult {
        accessToken
        refreshToken
      }
    }
  }
`
