import { ApolloProvider } from '@apollo/client'
import { CSSReset, theme, ThemeProvider } from '@chakra-ui/core'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { apolloClient } from '../client/apollo-client'
import { Routing } from '../routing/routing'

export const App: React.FC = () => {
  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Routing />
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  )
}
