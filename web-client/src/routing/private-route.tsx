import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useCurrentUserQuery } from '../generated/graphql'

interface PrivateRouteProps extends React.ComponentProps<typeof Route> {}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  ...routeProps
}) => {
  const { data, loading, error } = useCurrentUserQuery({
    fetchPolicy: 'no-cache',
  })

  if (
    !loading &&
    error?.graphQLErrors.some(
      (err) => err.extensions && err.extensions.code === 'UNAUTHENTICATED',
    )
  ) {
    return <Navigate to="/login" state={{ from: path }} />
  }

  if (loading || !data) {
    return null
  }

  return <Route path={path} {...routeProps} />
}
