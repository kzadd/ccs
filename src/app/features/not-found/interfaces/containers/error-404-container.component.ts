import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { heroHomeSolid as homeIcon } from '@ng-icons/heroicons/solid'

import { ButtonComponent } from '@app/shared/components'

/**
 * Error 404 container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, NgIcon],
  selector: 'app-error-404-container',
  styleUrl: './error-404-container.component.scss',
  templateUrl: './error-404-container.component.html',
  viewProviders: [provideIcons({ homeIcon })]
})
export class Error404ContainerComponent {
  private _router = inject(Router)

  handleGoHome() {
    this._router.navigate(['/'])
  }
}
