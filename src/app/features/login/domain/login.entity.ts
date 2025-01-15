import { FormControlsMap } from '@app/shared/types/form.types'

export interface LoginAuth {
  password: string
  usarname: string
}

export type LoginAuthForm = FormControlsMap<LoginAuth>
export type LoginAuthKey = Extract<keyof LoginAuth, string>
