import { Routes } from '@angular/router'

import { authGuard } from './core/guards/auth.guard'
import { countryRoutes } from './features/country'
import { DashboardPage } from './features/dashboard'
import { LoginPage } from './features/login'
import { NotFoundPage } from './features/not-found'
import { BrandLayoutComponent as BrandLayout } from './layout/brand-layout.component'
import { ROUTE_PATHS } from './shared/constants/routes.constant'

/**
 * Main application routes configuration.
 * Defines public and protected routes with their respective guards and components.
 */
export const routes: Routes = [
  {
    children: [
      { path: ROUTE_PATHS.root, pathMatch: 'full', redirectTo: ROUTE_PATHS.login },
      { component: LoginPage, path: ROUTE_PATHS.login }
    ],
    path: ROUTE_PATHS.auth
  },
  { path: ROUTE_PATHS.root, pathMatch: 'full', redirectTo: ROUTE_PATHS.dashboard },
  {
    canActivate: [authGuard],
    children: [
      { component: DashboardPage, path: ROUTE_PATHS.root, pathMatch: 'full' },
      ...countryRoutes
    ],
    component: BrandLayout,
    path: ROUTE_PATHS.dashboard
  },
  { component: NotFoundPage, path: ROUTE_PATHS.notFound }
]
