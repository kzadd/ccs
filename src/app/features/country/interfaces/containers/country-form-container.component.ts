import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core'
import { Router } from '@angular/router'

import { CrudFormComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { FormConfig, FormField } from '@app/shared/types/components/customs/crud-form.types'
import { isRequired } from '@app/shared/utils/validators.utils'
import { Country, CountryFormMode } from '../../domain/country.entity'

/**
 * Country form container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudFormComponent],
  selector: 'app-country-form-container',
  template: `
    <div class="country-form">
      <app-crud-form [formConfig]="formConfig" [initialValues]="initialValues()" [mode]="mode()" />
    </div>
  `
})
export class CountryFormContainerComponent implements OnInit {
  private _router = inject(Router)

  mode = input.required<CountryFormMode>()

  baseFields = signal<FormField<Country>[]>([
    {
      label: 'Nombre',
      name: 'name',
      placeholder: 'Ingrese el nombre',
      type: 'input',
      validations: [isRequired]
    },
    {
      label: 'Apellido',
      name: 'lastname',
      placeholder: 'Ingrese el apellido',
      type: 'input',
      validations: [isRequired]
    }
  ])

  formConfig!: FormConfig<Country, CountryFormMode>
  initialValues = signal<Partial<Country>>({})

  ngOnInit(): void {
    const mode = this.mode()

    if (mode === 'edit') {
      this.initialValues.set({ id: '0001', lastname: 'Ramirez Fernandez', name: 'Juan Carlos' })
    }

    this.formConfig = {
      edit: {
        cancelLabel: 'Cancelar',
        fields: [{ disabled: true, label: 'Id', name: 'id', type: 'input' }, ...this.baseFields()],
        onAction: () => this.handleSubmit(),
        onCancel: () => this.handleCancel(),
        submitLabel: 'Guardar Cambios'
      },
      new: {
        cancelLabel: 'Cancelar',
        fields: this.baseFields(),
        onAction: () => this.handleSubmit(),
        onCancel: () => this.handleCancel(),
        submitLabel: 'Crear País'
      }
    }
  }

  handleCancel(): void {
    this._router.navigate([FULL_ROUTE_PATHS.country.list])
  }

  handleSubmit(): void {
    this._router.navigate([FULL_ROUTE_PATHS.country.list])
  }
}
