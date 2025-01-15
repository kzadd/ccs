import {
  Directive,
  inject,
  Input,
  OnDestroy,
  OnInit,
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

  @Input({ alias: 'appResponsive', required: true }) breakpoint!: ResponsiveBreakpoint

  private _breakpoints: BreakpointValues = { '2xl': 1536, lg: 992, md: 768, sm: 576, xl: 1200 }
  private _hasView = false
  private _resizeSubscription!: Subscription

  ngOnDestroy(): void {
    this._resizeSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this._resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100), startWith(null))
      .subscribe(() => this._updateView())
  }

  private _evaluateBreakpoint(condition: ResponsiveBreakpoint, width: number): boolean {
    const currentBreakpoint = this._breakpoints[condition as ScreenSize]

    if (currentBreakpoint !== undefined) {
      const breakpoints = Object.values(this._breakpoints)
      const nextBreakpoint = breakpoints.find(value => value > currentBreakpoint) ?? Infinity

      return width >= currentBreakpoint && width < nextBreakpoint
    }

    if (condition.startsWith('down:')) {
      const breakpoint = condition.split(':')[1] as ScreenSize

      return width <= this._breakpoints[breakpoint]
    }

    if (condition.startsWith('up:')) {
      const breakpoint = condition.split(':')[1] as ScreenSize

      return width >= this._breakpoints[breakpoint]
    }

    return false
  }

  private _updateView(): void {
    const width = window.innerWidth
    const shouldShow = this._evaluateBreakpoint(this.breakpoint, width)

    this._updateViewContainer(shouldShow)
  }

  private _updateViewContainer(shouldShow: boolean): void {
    if (!shouldShow && this._hasView) {
      this._hasView = false
      this._viewContainer.clear()
    }

    if (!this._hasView && shouldShow) {
      this._hasView = true
      this._viewContainer.createEmbeddedView(this._templateRef)
    }
  }
}
