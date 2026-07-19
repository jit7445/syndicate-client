import { Navigate, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../../utils/authUtils'
import { APP_ROUTES } from '../../constants/appRoutes'
import type { ReactNode } from 'react'

type RequireAuthProps = {
  children: ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation()

  if (!isLoggedIn()) {
    return (
      <Navigate
        to={{ pathname: APP_ROUTES.home, search: '?authRequired=1' }}
        state={{ from: location }}
        replace
      />
    )
  }

  return <>{children}</>
}
