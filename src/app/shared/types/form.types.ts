import { FormControl } from '@angular/forms'

export type FormControlsMap<T> = {
  [Property in keyof T]: FormControl<T[Property]>
}
