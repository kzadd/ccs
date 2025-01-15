import { BreadcrumbItem } from '../basics/breadcrumb.types'
import { ButtonColor, ButtonVariant } from '../basics/button.types'

export interface HeadingAction {
  color?: ButtonColor
  disabled?: boolean
  icon?: string
  label: string
  onAction: () => void
  variant?: ButtonVariant
}

export type HeadingConfig<T extends string> = Record<T, HeadingConfigItem>

export interface HeadingConfigItem {
  actions?: HeadingAction[]
  breadcrumbs: BreadcrumbItem[]
  title: string
}
