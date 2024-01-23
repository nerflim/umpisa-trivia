// routeGuard.ts

import { useUserStore } from '@/stores/users'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const requireAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const user = useUserStore()
  const isAuthenticated: boolean = !!user.user

  if (isAuthenticated) {
    next()
  } else {
    next('/login') // Redirect to the login page or another route
  }
}
