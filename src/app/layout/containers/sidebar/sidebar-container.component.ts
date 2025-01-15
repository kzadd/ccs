import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal
} from '@angular/core'
import { NavigationEnd, Router, RouterLink } from '@angular/router'
import { NgIcon } from '@ng-icons/core'
import {
  heroGlobeAltSolid as countryIcon,
  heroHomeSolid as homeIcon
} from '@ng-icons/heroicons/solid'

import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'
import { NavigationItem, NavigationRoute } from '@app/shared/types/navigation.types'

/**
 * Sidebar container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RouterLink],
  selector: 'app-sidebar-container',
  styleUrl: './sidebar-container.component.scss',
  templateUrl: './sidebar-container.component.html'
})
export class SidebarContainerComponent implements OnInit {
  private _router = inject(Router)

  closeSidebar = output<void>()
  sidebarCollapsed = input<boolean>(false)

  currentUrl = signal<string>(this._router.url)

  navigationItems = signal<NavigationItem[]>([
    { icon: homeIcon, label: 'Panel', namePath: 'dashboard', path: this._buildPath('dashboard') },
    { icon: countryIcon, label: 'Pais', namePath: 'country', path: this._buildPath('country') }
  ])

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(event.urlAfterRedirects)
      }
    })
  }

  private _buildPath(section: NavigationRoute): string {
    return section === ROUTE_PATHS.dashboard
      ? FULL_ROUTE_PATHS.dashboard.root
      : `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS[section]}/${ROUTE_PATHS.list}`
  }

  isRouteActive(namePath: string, path: string): boolean {
    const currentUrl = this.currentUrl()

    return currentUrl === path || currentUrl.split('/')[2] === namePath
  }

  handleCloseSidebar(): void {
    this.closeSidebar.emit()
  }
}
