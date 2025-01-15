import { ButtonColor } from './button.types'

export interface TableAction<T> {
  color?: ButtonColor
  icon?: string
  label: string
  onAction: (row: T) => void
}

export interface TableColumn<T> {
  sortable?: boolean
  key: TableKey<T>
  label: string
  width?: string
}

export type TableData<T> = {
  [Property in keyof T]: T[Property]
}

export type TableDataValue<T> = TableData<T>[TableKey<T>]
export type TableKey<T> = Extract<keyof T, string>
export type TableSortOrder = 'asc' | 'desc' | 'none'
