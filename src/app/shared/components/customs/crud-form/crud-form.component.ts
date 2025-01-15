import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { heroCheckSolid as saveIcon } from '@ng-icons/heroicons/solid'

import {
  FormConfig,
  FormConfigItem,
  FormDataKey
} from '@app/shared/types/components/customs/crud-form.types'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { ButtonComponent, InputComponent } from '../../basics'

/**
 * Crud form component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, InputComponent, NgIcon, ReactiveFormsModule],
  selector: 'app-crud-form',
  styleUrl: './crud-form.component.scss',
  templateUrl: './crud-form.component.html',
  viewProviders: [provideIcons({ saveIcon })]
})
export class CrudFormComponent<D, M extends string> implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)

  @Input({ required: true }) config!: FormConfig<D, M>
  @Input({ required: true }) initialValues!: Partial<D>
  @Input({ required: true }) mode!: M

  activeConfig!: FormConfigItem<D>
  form!: FormGroup

  ngOnInit(): void {
    this.activeConfig = this.config[this.mode]
    this.initializeForm()
  }

  private initializeForm(): void {
    const controls = this.activeConfig.fields.reduce(
      (acc: Record<Extract<keyof D, string>, FormControl<unknown>>, field) => {
        acc[field.name as Extract<keyof D, string>] = this._formBuilder.control(
          { disabled: field.disabled ?? false, value: this.initialValues[field.name] ?? '' },
          field.validations ?? []
        )

        return acc
      },
      {} as Record<Extract<keyof D, string>, FormControl<unknown>>
    )

    this.form = this._formBuilder.group(controls)
  }

  getErrorMessage(controlName: FormDataKey<D>): string {
    const control = this.form.get(controlName)

    return control ? getFormControlErrorMessage(control) : ''
  }
  handleCancel(): void {
    this.activeConfig?.onCancel?.()
    this.form.reset()
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.activeConfig.onAction()
      this.form.reset()
    } else {
      this.form.markAllAsTouched()
    }
  }
}
