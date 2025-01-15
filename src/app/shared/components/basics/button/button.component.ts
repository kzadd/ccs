import { ChangeDetectionStrategy, Component, input } from '@angular/core'

import {
  ButtonColor,
  ButtonType,
  ButtonVariant
} from '@app/shared/types/components/basics/button.types'

/**
 * Button component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-button',
  styleUrl: './button.component.scss',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  color = input<ButtonColor>('primary')
  disabled = input<boolean>(false)
  fullWidth = input<boolean>(false)
  type = input<ButtonType>('button')
  variant = input<ButtonVariant>('contained')
}
