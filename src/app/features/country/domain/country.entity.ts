type BaseFormMode = 'edit' | 'new'

export interface Country {
  id: string
  name: string
  lastname: string
}

export type CountryFormMode = BaseFormMode
export type CountryViewMode = 'list' | 'show' | BaseFormMode
