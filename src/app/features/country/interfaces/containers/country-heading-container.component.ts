import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core'
import { Router } from '@angular/router'
import { heroPlusSolid as newIcon } from '@ng-icons/heroicons/solid'

import { CountryPageType } from '@app/features/country/domain/country.entity'
import { CrudHeadingComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { HeadingConfig } from '@app/shared/types/components/customs/crud-heading.types'

/**
 * Country heading container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudHeadingComponent],
  selector: 'app-country-heading-container',
  template: `
    <div class="country-heading">
      <app-crud-heading [headingConfig]="headingConfig()" [pageType]="pageType()" />
    </div>
  `
})
export class CountryHeadingContainerComponent {
  private _router = inject(Router)

  pageType = input.required<CountryPageType>()

  headingConfig = signal<HeadingConfig<CountryPageType>>({
    edit: {
      breadcrumbs: [
        { label: 'Panel', path: FULL_ROUTE_PATHS.dashboard.root },
        { label: 'Países', path: FULL_ROUTE_PATHS.country.list },
        { label: 'Editar país' }
      ],
      title: 'Editar información del país'
    },
    list: {
      actions: [
        {
          icon: newIcon,
          label: 'Agregar país',
          onAction: () => this._handleNewCountry()
        }
      ],
      breadcrumbs: [
        { label: 'Panel', path: FULL_ROUTE_PATHS.dashboard.root },
        { label: 'Lista de países' }
      ],
      title: 'Listado de países'
    },
    new: {
      breadcrumbs: [
        { label: 'Panel', path: FULL_ROUTE_PATHS.dashboard.root },
        { label: 'Países', path: FULL_ROUTE_PATHS.country.list },
        { label: 'Agregar país' }
      ],
      title: 'Agregar nuevo país'
    },
    show: {
      breadcrumbs: [
        { label: 'Panel', path: FULL_ROUTE_PATHS.dashboard.root },
        { label: 'Países', path: FULL_ROUTE_PATHS.country.list },
        { label: 'Detalles del país' }
      ],
      title: 'Información detallada del país'
    }
  })

  private _handleNewCountry() {
    this._router.navigate([FULL_ROUTE_PATHS.country.new])
  }
}
