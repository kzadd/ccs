import { ROUTE_PATHS } from './routes.constant'

export const ACCESS_TOKEN_KEY = 'access_token'
export const DEFAULT_CREDENTIALS = { password: '123456', usarname: 'kzadd' }

export const FULL_ROUTE_PATHS = {
  auth: {
    login: `/${ROUTE_PATHS.auth}/${ROUTE_PATHS.login}`
  },
  country: {
    edit: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.country}/${ROUTE_PATHS.edit}`,
    list: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.country}/${ROUTE_PATHS.list}`,
    new: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.country}/${ROUTE_PATHS.new}`,
    show: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.country}/${ROUTE_PATHS.show}`
  },
  dashboard: {
    root: `/${ROUTE_PATHS.dashboard}`
  }
}
