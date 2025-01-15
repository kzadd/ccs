import { ChangeDetectionStrategy, Component, input, model, signal } from '@angular/core'
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
  private _originalData = signal<TableData<T>[]>([])

  actions = input<TableAction<T>[]>([])
  columns = input<TableColumn<T>[]>([])

  data = model<TableData<T>[]>([])

  sortBy = signal<TableDataKey<T> | null>(null)
  sortOrder = signal<TableSortOrder>('none')

  private _compareValues(a: TableDataValue<T>, b: TableDataValue<T>): number {
    if (a === b) return 0
    if (a === null || a === undefined) return 1
    if (b === null || b === undefined) return -1

    const valueA = typeof a === 'string' ? a.toLowerCase() : a
    const valueB = typeof b === 'string' ? b.toLowerCase() : b

    return valueA < valueB ? -1 : 1
  }

  private _getSortedData(key: TableDataKey<T>): TableData<T>[] {
    const data = this.data()
    const sortOrder = this.sortOrder()

    return [...data].sort((currentRow, nextRow) => {
      const comparison = this._compareValues(currentRow[key], nextRow[key])

      return sortOrder === 'desc' ? -comparison : comparison
    })
  }

  private _updateSortOrder(key: TableDataKey<T>): void {
    const sortBy = this.sortBy()
    const isSameColumn = sortBy === key

    if (!isSameColumn) {
      this.sortBy.set(key)
      this.sortOrder.set('asc')

      return
    }

    const directions: Record<TableSortOrder, TableSortOrder> = {
      asc: 'desc',
      desc: 'none',
      none: 'asc'
    }

    const sortOrder = this.sortOrder()

    this.sortOrder.set(directions[sortOrder])
  }

  sortData(column: TableColumn<T>): void {
    if (!column.sortable) return

    const data = this.data()
    const originalData = this._originalData()

    if (!originalData.length) {
      this._originalData.set([...data])
    }

    this._updateSortOrder(column.key)

    const sortOrder = this.sortOrder()

    this.data.set(sortOrder === 'none' ? [...originalData] : this._getSortedData(column.key))
  }
}
