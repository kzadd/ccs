import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core'
import { Router } from '@angular/router'
import {
  heroEyeSolid as detailIcon,
  heroPencilSquareSolid as editIcon,
  heroTrashSolid as deleteIcon
} from '@ng-icons/heroicons/solid'

import { Country } from '@app/features/country/domain/country.entity'
import { TableComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import {
  TableAction,
  TableColumn,
  TableData
} from '@app/shared/types/components/basics/table.types'

/**
 * Country table container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent],
  selector: 'app-country-table-container',
  template: `
    <div class="country-table">
      <app-table [actions]="actions()" [columns]="columns()" [data]="data()" />
    </div>
  `
})
export class CountryTableContainerComponent implements OnInit {
  private _router = inject(Router)

  actions = signal<TableAction<Country>[]>([])
  columns = signal<TableColumn<Country>[]>([])
  data = signal<TableData<Country>[]>([])

  ngOnInit(): void {
    this.actions.set([
      {
        icon: detailIcon,
        label: 'Detalle',
        onAction: row => this._handleShowCountry(row)
      },
      {
        color: 'secondary',
        icon: editIcon,
        label: 'Editar',
        onAction: row => this._handleEditC(row)
      },
      {
        color: 'error',
        icon: deleteIcon,
        label: 'Eliminar',
        onAction: row => this._handleDeleteCountry(row)
      }
    ])

    this.columns.set([
      { key: 'id', label: 'ID', sortable: true, width: '120px' },
      { key: 'name', label: 'Nombre', sortable: true, width: '250px' },
      { key: 'lastname', label: 'Apellido', sortable: true, width: '250px' }
    ])

    this.data.set([{ id: '0001', lastname: 'Ramirez Fernandez', name: 'Juan Carlos' }])
  }

  private _handleDeleteCountry(row: Country) {
    console.log('Delete', row)
  }

  private _handleShowCountry(row: Country) {
    this._router.navigate([FULL_ROUTE_PATHS.country.show.replace(':id', row.id)])
  }

  private _handleEditC(row: Country) {
    this._router.navigate([FULL_ROUTE_PATHS.country.edit.replace(':id', row.id)])
  }
}
