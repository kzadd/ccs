export interface DetailConfig<T> {
  key: keyof T
  label: string
  value: T[keyof T]
}
