import { HttpErrorResponse } from '@angular/common/http'

import { BaseError, CreateErrorOptions, CreateErrorResponse } from '../types/exception.types'

/**
 * Creates a standardized error object with consistent structure.
 * Handles both HTTP and regular errors with code, reason and original error details.
 */
export const createError = ({
  code,
  originalError,
  reason
}: CreateErrorOptions): CreateErrorResponse => {
  const isNetworkError = originalError instanceof HttpErrorResponse
  const errorCode = code ?? (isNetworkError ? (originalError.status ?? null) : null)
  const errorInstance = originalError ?? null
  const errorReason = reason ?? (isNetworkError ? originalError.message : null)

  return {
    code: errorCode,
    originalError: errorInstance,
    reason: errorReason,

    toJSON(): string {
      return JSON.stringify(this.toObject())
    },

    toObject(): BaseError {
      return { code: this.code, originalError: this.originalError, reason: this.reason }
    }
  }
}
