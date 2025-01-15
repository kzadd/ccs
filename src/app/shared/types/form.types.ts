import { FormControl } from '@angular/forms'

export type FormControlWrapper<T> = {
  [Property in keyof T]: FormControl<T[Property]>
}
