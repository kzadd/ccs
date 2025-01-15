import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import {
  HttpHeadersOptions,
  HttpMethod,
  HttpRequestOptions,
  NetworkHttpResponse
} from '../types/http.types'
import { getCookie } from '../utils/cookie.utils'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _http = inject(HttpClient)

  /**
   * Creates and configures HTTP headers.
   */
  private _createHeaders({
    contentType = 'application/json',
    customHeaders = {},
    isPublic = false,
    token
  }: HttpHeadersOptions): HttpHeaders {
    let headers = new HttpHeaders(customHeaders)

    if (contentType) {
      headers = headers.set('Content-Type', contentType)
    }

    if (!isPublic) {
      const accessToken = token ?? getCookie('access_token') ?? ''

      if (accessToken) {
        headers = headers.set('Authorization', `Bearer ${accessToken}`)
      }
    }

    return headers
  }

  /**
   * Makes an HTTP request to the specified endpoint and transforms the response.
   */
  private _createRequest<T>({
    data,
    headers,
    method,
    url
  }: HttpRequestOptions): Observable<NetworkHttpResponse<T>> {
    return this._http.request<T>(method, url, { body: data, headers }).pipe(
      map(response => ({ data: response })),
      catchError((error: HttpErrorResponse) => this._generateError(url, error))
    )
  }

  /**
   * Creates and configures HTTP requests with proper headers and body formatting.
   * Acts as a central factory for all HTTP methods.
   */
  private _factoryRequest<T>(
    method: HttpMethod,
    options: HttpHeadersOptions = {},
    url: string
  ): Observable<NetworkHttpResponse<T>> {
    const { body, ...restOptions } = options

    const headers = this._createHeaders(restOptions)
    const data = body && JSON.stringify(body)

    return this._createRequest<T>({ data, headers, method, url })
  }

  /**
   * Logs HTTP errors and returns an error Observable for error handling.
   */
  private _generateError(url: string, error: HttpErrorResponse): Observable<never> {
    console.error(`Request to ${url} failed`, error)

    return throwError(() => error)
  }

  /**
   * Provides HTTP methods (DELETE, GET, PATCH, POST, PUT) for making API requests.
   * Each method uses the factory to ensure consistent request handling.
   */
  deleteJsonRequest<T>(
    url: string,
    options?: HttpHeadersOptions
  ): Observable<NetworkHttpResponse<T>> {
    return this._factoryRequest<T>('DELETE', options, url)
  }

  getJsonRequest<T>(url: string, options?: HttpHeadersOptions): Observable<NetworkHttpResponse<T>> {
    return this._factoryRequest<T>('GET', options, url)
  }

  patchJsonRequest<T>(
    url: string,
    options?: HttpHeadersOptions
  ): Observable<NetworkHttpResponse<T>> {
    return this._factoryRequest<T>('PATCH', options, url)
  }

  postJsonRequest<T>(
    url: string,
    options?: HttpHeadersOptions
  ): Observable<NetworkHttpResponse<T>> {
    return this._factoryRequest<T>('POST', options, url)
  }

  putJsonRequest<T>(url: string, options?: HttpHeadersOptions): Observable<NetworkHttpResponse<T>> {
    return this._factoryRequest<T>('PUT', options, url)
  }
}
