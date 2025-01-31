import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  heroArrowLeftStartOnRectangleSolid as logoutIcon,
  heroBars3Solid as menuIcon,
  heroUserCircleSolid as userIcon
} from '@ng-icons/heroicons/solid'

import { ButtonComponent } from '@app/shared/components'
import {
  ACCESS_TOKEN_KEY,
  DEFAULT_CREDENTIALS,
  FULL_ROUTE_PATHS
} from '@app/shared/constants/app.constant'
import { ResponsiveDirective } from '@app/shared/directives/responsive.directive'
import { deleteCookie } from '@app/shared/utils/cookie.utils'

/**
 * Topbar container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, NgIcon, ResponsiveDirective, RouterLink],
  selector: 'app-topbar-container',
  styleUrl: './topbar-container.component.scss',
  templateUrl: './topbar-container.component.html',
  viewProviders: [provideIcons({ logoutIcon, menuIcon, userIcon })]
})
export class TopbarContainerComponent {
  private _router = inject(Router)

  @Input() dropdownOpen = false
  @Output() toggleSidebar = new EventEmitter<void>()

  profileName: string = DEFAULT_CREDENTIALS.usarname

  handleLogout(): void {
    deleteCookie(ACCESS_TOKEN_KEY)
    this._router.navigate([FULL_ROUTE_PATHS.auth.login])
  }

  handleProfileHover(isHovered: boolean): void {
    this.dropdownOpen = isHovered
  }

  handleToggleSidebar(): void {
    this.toggleSidebar.emit()
  }
}
