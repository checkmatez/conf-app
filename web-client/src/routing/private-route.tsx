import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useCurrentUserQuery } from '../generated/graphql'

interface PrivateRouteProps extends React.ComponentProps<typeof Route> {}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  ...routeProps
}) => {
  const { data, loading } = useCurrentUserQuery({
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
