import { HttpHeaders } from '@angular/common/http'

export interface ApiResponse<T> extends NetworkHttpResponse<ServiceResponse<T>> {}

export interface HttpHeadersOptions {
  body?: Record<string, unknown>
  contentType?: string
  customHeaders?: Record<string, string>
  isPublic?: boolean
  token?: string
}

export type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'

export interface HttpRequestOptions {
  data?: string
  headers: HttpHeaders
  method: HttpMethod
  url: string
}

export interface NetworkHttpResponse<T> {
  data: T
}

export interface ServiceResponse<T> {
  errors: null | string[]
  payload: T
  success: string
}
