import { ValidatorFn } from '@angular/forms'

export type FormConfig<D, M extends string> = Record<M, FormConfigItem<D>>

export interface FormConfigItem<D> {
  cancelLabel?: string
  fields: FormField<D>[]
  onAction: () => void
  onCancel?: () => void
  submitLabel: string
}

export type FormDataKey<D> = Extract<keyof D, string>

export interface FormField<D> {
  disabled?: boolean
  label: string
  name: FormDataKey<D>
  options?: FormFieldOption[]
  placeholder?: string
  type: FormFieldType
  validations?: ValidatorFn[]
}

export interface FormFieldOption {
  label: string
  value: number | string
}

export type FormFieldType =
  | 'checkbox'
  | 'custom'
  | 'date'
  | 'email'
  | 'input'
  | 'number'
  | 'password'
  | 'radio'
  | 'select'
  | 'textarea'
