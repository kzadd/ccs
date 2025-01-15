import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CountryFormContainerComponent } from '../containers/country-form-container.component'
import { CountryHeadingContainerComponent } from '../containers/country-heading-container.component'

/**
 * Country edit page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountryFormContainerComponent, CountryHeadingContainerComponent],
  selector: 'app-country-edit-page',
  template: `
    <app-country-heading-container pageType="edit" />
    <app-country-form-container pageType="edit" />
  `
})
export class CountryEditPageComponent {}
