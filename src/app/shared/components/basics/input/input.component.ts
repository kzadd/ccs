import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'

import { InputType } from '@app/shared/types/components/basics/input.types'

/**
 * Input component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  providers: [
    { multi: true, provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent) }
  ],
  selector: 'app-input',
  styleUrl: './input.component.scss',
  templateUrl: './input.component.html'
})
export class InputComponent implements ControlValueAccessor {
  error = input<string>('')
  id = input<string>('')
  label = input<string>('')
  name = input<string>('')
  placeholder = input<string>('')
  type = input<InputType>('text')

  disabled = signal<boolean>(false)
  value = signal<string>('')

  private _onChange: (value: string) => void = () => {}
  private _onTouched: () => void = () => {}

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement

    this.value.set(inputElement.value)
    this._onChange(inputElement.value)
    this._onTouched()
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }

  writeValue(value: string): void {
    this.value.set(value ?? '')
  }
}
