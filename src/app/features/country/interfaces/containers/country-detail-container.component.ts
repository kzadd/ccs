import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core'
import { Router } from '@angular/router'

import { Country } from '@app/features/country/domain/country.entity'
import { CrudDetailComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { DetailConfig } from '@app/shared/types/components/customs/crud-detail.types'

/**
 * Country detail container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudDetailComponent],
  selector: 'app-country-detail-container',
  template: `
    <div class="country-detail">
      <app-crud-detail [detailConfig]="detailConfig" />
    </div>
  `
})
export class CountryDetailContainerComponent implements OnInit {
  private _router = inject(Router)

  country = signal<Country | null>(null)
  detailConfig!: DetailConfig<Country>

  ngOnInit(): void {
    this.country.set({ id: '0001', lastname: 'Ramirez Fernandez', name: 'Juan Carlos' })

    const country = this.country()

    if (country) {
      this.detailConfig = {
        detailItems: [
          { key: 'id', label: 'Id', value: country.id },
          { key: 'name', label: 'Nombre', value: country.name },
          { key: 'lastname', label: 'Apellido', value: country.lastname }
        ],
        onGoBack: () => this.handleGoBack()
      }
    }
  }

  handleGoBack(): void {
    this._router.navigate([FULL_ROUTE_PATHS.country.list])
  }
}
