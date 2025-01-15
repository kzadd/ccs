import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { heroHomeSolid as homeIcon } from '@ng-icons/heroicons/solid'

import { BreadcrumbItem } from '@app/shared/types/components/basics/breadcrumb.types'

/**
 * Breadcrumb component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RouterLink],
  selector: 'app-breadcrumb',
  styleUrl: './breadcrumb.component.scss',
  templateUrl: './breadcrumb.component.html',
  viewProviders: [provideIcons({ homeIcon })]
})
export class BreadcrumbComponent {
  breadcrumbItems = input<BreadcrumbItem[]>([])
}
