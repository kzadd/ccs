import { FormControlWrapper } from '@app/shared/types/form.types'

interface LoginField {
  email: string
  password: string
}

export type LoginAuth = LoginField
export type LoginAuthForm = FormControlWrapper<LoginField>
export type LoginAuthKey = Extract<keyof LoginField, string>
