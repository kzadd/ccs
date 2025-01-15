import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core'
import { NgIcon } from '@ng-icons/core'

import { BreadcrumbComponent, ButtonComponent } from '@app/shared/components/basics'
import {
  HeadingConfig,
  HeadingConfigItem
} from '@app/shared/types/components/customs/crud-heading.types'

/**
 * Crud heading component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent, ButtonComponent, NgIcon],
  selector: 'app-crud-heading',
  styleUrl: './crud-heading.component.scss',
  templateUrl: './crud-heading.component.html'
})
export class CrudHeadingComponent<T extends string> implements OnInit {
  headingConfig = input.required<HeadingConfig<T>>()
  mode = input.required<T>()

  activeHeadingConfig!: HeadingConfigItem

  ngOnInit(): void {
    const headingConfig = this.headingConfig()
    const mode = this.mode()

    if (!headingConfig) {
      throw new Error(`Configuration for mode "${mode}" not found.`)
    }

    this.activeHeadingConfig = headingConfig[mode]
  }
}
