import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { SidebarContainerComponent } from './containers/sidebar/sidebar-container.component'
import { TopbarContainerComponent } from './containers/topbar/topbar-container.component'

/**
 * Brand layout.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SidebarContainerComponent, TopbarContainerComponent],
  selector: 'app-brand-layout',
  styleUrl: './brand-layout.component.scss',
  templateUrl: './brand-layout.component.html'
})
export class BrandLayoutComponent {
  overlaySidebar = signal<boolean>(false)
  sidebarCollapsed = signal<boolean>(false)

  handleCloseSidebar(): void {
    this.overlaySidebar.set(false)
    this.sidebarCollapsed.set(false)
  }

  handleToggleSidebar(): void {
    this.overlaySidebar.update(prev => !prev)
    this.sidebarCollapsed.update(prev => !prev)
  }
}
