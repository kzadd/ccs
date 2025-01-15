import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core'

import { Country } from '@app/features/country/domain/country.entity'
import { CrudDetailComponent } from '@app/shared/components'
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
      <app-crud-detail [detailConfig]="detailConfig()" />
    </div>
  `
})
export class CountryDetailContainerComponent implements OnInit {
  country = signal<Country | null>(null)
  detailConfig = signal<DetailConfig<Country>[]>([])

  ngOnInit(): void {
    this.country.set({ id: '0001', lastname: 'Ramirez Fernandez', name: 'Juan Carlos' })

    const country = this.country()

    if (country) {
      this.detailConfig.set([
        { key: 'id', label: 'Id', value: country.id },
        { key: 'name', label: 'Nombre', value: country.name },
        { key: 'lastname', label: 'Apellido', value: country.lastname }
      ])
    }
  }
}
