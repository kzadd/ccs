import { env } from '@env/environment'

/**
 * Environment configuration that manages API URLs and environment settings.
 */
export const { API_URL = '', ROOT_URL = '/', MOCKING_ENABLED = false, ENV = 'local' } = env
