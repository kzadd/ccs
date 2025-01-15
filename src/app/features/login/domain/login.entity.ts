import { FormControlWrapper } from '@app/shared/types/form.types'

export interface LoginAuth {
  email: string
  password: string
}

export type LoginAuthForm = FormControlWrapper<LoginAuth>
export type LoginAuthKey = Extract<keyof LoginAuth, string>
