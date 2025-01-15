import { ROUTE_PATHS } from '../constants/routes.constant'

export interface NavigationItem {
  icon: string
  label: string
  namePath: string
  path: string
}

export type NavigationRoute = keyof typeof ROUTE_PATHS
