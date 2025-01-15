import { MOCKING_ENABLED } from '../shared/configs/environment.config'

/**
 * Initializes mock service worker to intercept API requests.
 * Only runs when mocking is enabled in environment config.
 */
export const initializeMockServiceWorker = async () => {
  if (!MOCKING_ENABLED) return

  try {
    const { worker } = await import('./browser.mock')

    await worker.start()
    console.log('Mock service worker started.')
  } catch (error) {
    console.error('Failed to start mock service worker:', error)
  }
}
