import { ChangeDetectionStrategy, Component, input } from '@angular/core'

import { DetailConfig } from '@app/shared/types/components/customs/crud-detail.types'

/**
 * Crud detail component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-crud-detail',
  styleUrl: './crud-detail.component.scss',
  templateUrl: './crud-detail.component.html'
})
export class CrudDetailComponent<T> {
  detailConfig = input.required<DetailConfig<T>[]>()
}
