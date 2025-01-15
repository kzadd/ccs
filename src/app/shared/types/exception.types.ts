import { HttpErrorResponse } from '@angular/common/http'

export interface BaseError {
  code: null | number
  originalError: Error | HttpErrorResponse | null
  reason: null | string
}

export interface CreateErrorOptions {
  code?: null | number
  originalError?: Error | HttpErrorResponse | null
  reason?: null | string
}

export interface CreateErrorResponse extends BaseError {
  toJSON: () => string
  toObject: () => BaseError
}
