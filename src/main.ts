import { bootstrapApplication } from '@angular/platform-browser'

import { initializeMockServiceWorker } from './app/__mocks__/initialize'
import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'

/**
 * Main entry point of the application.
 * Initializes mock API service if enabled and bootstraps the Angular application.
 */
initializeMockServiceWorker().then(() => {
  return bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err))
})
