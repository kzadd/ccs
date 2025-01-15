import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

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
  @Input() color: ButtonColor = 'primary'
  @Input() disabled = false
  @Input() fullWidth = false
  @Input() type: ButtonType = 'button'
  @Input() variant: ButtonVariant = 'contained'
}
