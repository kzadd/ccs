import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

/**
 * Custom validator to check if input value is a valid email address.
 */
export const isEmail: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const isValid = emailRegex.test(control.value.trim())

  return isValid ? null : { email: 'Ingrese un correo electrónico válido.' }
}

/**
 * Custom validator to check if input value contains only numeric characters.
 */
export const isNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null

  const numericRegex = /^[0-9]+$/
  const isValid = numericRegex.test(control.value.trim())

  return isValid ? null : { number: 'Este campo solo acepta números.' }
}

/**
 * Custom validator to check if input field has a non-empty value.
 */
export const isRequired: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const isValid = control.value && control.value.trim().length

  return isValid ? null : { required: 'Este campo es obligatorio.' }
}

/**
 * Custom validator factory that creates a validator to check maximum length.
 */
export const maxLength = (length: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null

    const isValid = control.value.trim().length <= length

    return isValid ? null : { maxlength: `Este campo no puede exceder los ${length} caracteres.` }
  }
}

/**
 * Custom validator factory that creates a validator to check minimum length.
 */
export const minLength = (length: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null

    const isValid = control.value.trim().length >= length

    return isValid ? null : { minlength: `Este campo debe tener al menos ${length} caracteres.` }
  }
}
