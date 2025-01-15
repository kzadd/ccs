import { Routes } from '@angular/router'

import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'
import { CountryEditPageComponent } from './interfaces/pages/country-edit-page.component'
import { CountryListPageComponent } from './interfaces/pages/country-list-page.component'
import { CountryNewPageComponent } from './interfaces/pages/country-new-page.component'
import { CountryShowPageComponent } from './interfaces/pages/country-show-page.component'

/**
 * Country routes configuration.
 */
export const countryRoutes: Routes = [
  {
    children: [
      { path: ROUTE_PATHS.root, pathMatch: 'full', redirectTo: ROUTE_PATHS.list },
      { component: CountryEditPageComponent, path: ROUTE_PATHS.edit },
      { component: CountryListPageComponent, path: ROUTE_PATHS.list },
      { component: CountryNewPageComponent, path: ROUTE_PATHS.new },
      { component: CountryShowPageComponent, path: ROUTE_PATHS.show }
    ],
    path: ROUTE_PATHS.country
  }
]
