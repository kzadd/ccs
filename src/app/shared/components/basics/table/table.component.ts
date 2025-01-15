import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  heroArrowDownCircleSolid as descIcon,
  heroArrowUpCircleSolid as ascIcon,
  heroMinusCircleSolid as noneIcon
} from '@ng-icons/heroicons/solid'

import {
  TableAction,
  TableColumn,
  TableData,
  TableDataKey,
  TableDataValue,
  TableSortOrder
} from '@app/shared/types/components/basics/table.types'

/**
 * Table component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  selector: 'app-table',
  styleUrl: './table.component.scss',
  templateUrl: './table.component.html',
  viewProviders: [provideIcons({ ascIcon, descIcon, noneIcon })]
})
export class TableComponent<T> {
  @Input() actions: TableAction<T>[] = []
  @Input() columns: TableColumn<T>[] = []
  @Input() data: TableData<T>[] = []

  private _originalData: TableData<T>[] = []
  sortBy: TableDataKey<T> | null = null
  sortOrder: TableSortOrder = 'none'

  private _compareValues(a: TableDataValue<T>, b: TableDataValue<T>): number {
    if (a === b) return 0
    if (a === null || a === undefined) return 1
    if (b === null || b === undefined) return -1

    const valueA = typeof a === 'string' ? a.toLowerCase() : a
    const valueB = typeof b === 'string' ? b.toLowerCase() : b

    return valueA < valueB ? -1 : 1
  }

  private _getSortedData(key: TableDataKey<T>): TableData<T>[] {
    return [...this.data].sort((currentRow, nextRow) => {
      const comparison = this._compareValues(currentRow[key], nextRow[key])

      return this.sortOrder === 'desc' ? -comparison : comparison
    })
  }

  private _updateSortOrder(key: TableDataKey<T>): void {
    const isSameColumn = this.sortBy === key

    if (!isSameColumn) {
      this.sortBy = key
      this.sortOrder = 'asc'

      return
    }

    const directions: Record<TableSortOrder, TableSortOrder> = {
      asc: 'desc',
      desc: 'none',
      none: 'asc'
    }

    this.sortOrder = directions[this.sortOrder]
  }

  sortData(column: TableColumn<T>): void {
    if (!column.sortable) return

    if (!this._originalData.length) {
      this._originalData = [...this.data]
    }

    this._updateSortOrder(column.key)

    this.data =
      this.sortOrder === 'none' ? [...this._originalData] : this._getSortedData(column.key)
  }
}
