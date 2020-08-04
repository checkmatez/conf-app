import { useQuery } from '@apollo/client'
import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { currentUserQuery } from '../graphql/queries/current-user-query'

interface PrivateRouteProps extends React.ComponentProps<typeof Route> {}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  ...routeProps
}) => {
  const { data, loading } = useQuery(currentUserQuery, {
    fetchPolicy: 'no-cache',
  })

  if (loading || !data) {
    return null
  }

  return data.currentUser ? (
    <Route path={path} {...routeProps} />
  ) : (
    <Navigate to="/login" state={{ from: path }} />
  )
}
