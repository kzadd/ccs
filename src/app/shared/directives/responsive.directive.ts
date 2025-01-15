import {
  Directive,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  ViewContainerRef
} from '@angular/core'
import { fromEvent, Subscription } from 'rxjs'
import { debounceTime, startWith } from 'rxjs/operators'

import { BreakpointValues, ResponsiveBreakpoint, ScreenSize } from '../types/responsive.types'

/**
 * Handles responsive behavior based on screen size breakpoints.
 * Conditionally renders content using up/down breakpoint modifiers.
 */
@Directive({
  selector: '[appResponsive]'
})
export class ResponsiveDirective implements OnDestroy, OnInit {
  private _templateRef = inject(TemplateRef)
  private _viewContainer = inject(ViewContainerRef)

  breakpoint = input.required<ResponsiveBreakpoint>({ alias: 'appResponsive' })

  private _breakpoints = signal<BreakpointValues>({
    '2xl': 1536,
    lg: 992,
    md: 768,
    sm: 576,
    xl: 1200
  })

  private _hasView = signal<boolean>(false)
  private _resizeSubscription = signal<Subscription | null>(null)

  ngOnDestroy(): void {
    this._resizeSubscription()?.unsubscribe()
  }

  ngOnInit(): void {
    this._resizeSubscription.set(
      fromEvent(window, 'resize')
        .pipe(debounceTime(100), startWith(null))
        .subscribe(() => this._updateView())
    )
  }

  private _evaluateBreakpoint(condition: ResponsiveBreakpoint, width: number): boolean {
    const _breakpoints = this._breakpoints()
    const currentBreakpoint = _breakpoints[condition as ScreenSize]

    if (currentBreakpoint !== undefined) {
      const breakpoints = Object.values(_breakpoints)
      const nextBreakpoint = breakpoints.find(value => value > currentBreakpoint) ?? Infinity

      return width >= currentBreakpoint && width < nextBreakpoint
    }

    if (condition.startsWith('down:')) {
      const breakpoint = condition.split(':')[1] as ScreenSize

      return width <= _breakpoints[breakpoint]
    }

    if (condition.startsWith('up:')) {
      const breakpoint = condition.split(':')[1] as ScreenSize

      return width >= _breakpoints[breakpoint]
    }

    return false
  }

  private _updateView(): void {
    const breakpoint = this.breakpoint()
    const width = window.innerWidth
    const shouldShow = this._evaluateBreakpoint(breakpoint, width)

    this._updateViewContainer(shouldShow)
  }

  private _updateViewContainer(shouldShow: boolean): void {
    const hasView = this._hasView()

    if (!shouldShow && hasView) {
      this._hasView.set(false)
      this._viewContainer.clear()
    }

    if (!hasView && shouldShow) {
      this._hasView.set(true)
      this._viewContainer.createEmbeddedView(this._templateRef)
    }
  }
}
