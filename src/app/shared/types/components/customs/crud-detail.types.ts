export interface DetailConfig<T> {
  detailItems: DetailConfigItem<T>[]
  onGoBack: () => void
}

export interface DetailConfigItem<T> {
  key: keyof T
  label: string
  value: T[keyof T]
}
