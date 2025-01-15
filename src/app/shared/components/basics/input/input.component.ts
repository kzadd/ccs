import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core'
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
  @Input() disabled = false
  @Input() error = ''
  @Input() id = ''
  @Input() label = ''
  @Input() name = ''
  @Input() placeholder = ''
  @Input() type: InputType = 'text'
  @Input() value = ''

  onChange: (value: string) => void = () => {}

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement

    this.value = inputElement.value
    this.onChange(inputElement.value)
    this.onTouched()
  }

  onTouched: () => void = () => {}

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(value: string): void {
    this.value = value ?? ''
  }
}
