import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  heroArrowRightStartOnRectangleSolid as loginIcon,
  heroEyeSlashSolid as hidePasswordIcon,
  heroEyeSolid as showPasswordIcon,
  heroXCircleSolid as errorIcon
} from '@ng-icons/heroicons/solid'

import { ButtonComponent, InputComponent } from '@app/shared/components'
import { ACCESS_TOKEN_KEY, DEFAULT_CREDENTIALS } from '@app/shared/constants/app.constant'
import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'
import { putCookie } from '@app/shared/utils/cookie.utils'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isRequired } from '@app/shared/utils/validators.utils'
import { LoginAuthForm, LoginAuthKey } from '../../domain/login.entity'

/**
 * Login auth container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ButtonComponent, InputComponent, NgIcon, ReactiveFormsModule],
  selector: 'app-login-auth-container',
  styleUrl: './login-auth-container.component.scss',
  templateUrl: './login-auth-container.component.html',
  viewProviders: [provideIcons({ errorIcon, hidePasswordIcon, loginIcon, showPasswordIcon })]
})
export class LoginAuthContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _router = inject(Router)

  errorMessage = false
  showPassword = false

  form: FormGroup<LoginAuthForm> = this._formBuilder.group({
    password: [DEFAULT_CREDENTIALS.password, [isRequired]],
    usarname: [DEFAULT_CREDENTIALS.usarname, [isRequired]]
  })

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => (this.errorMessage = false))
  }

  getErrorMessage(controlName: LoginAuthKey): string {
    const control = this.form.get(controlName)

    return control ? getFormControlErrorMessage(control) : ''
  }

  handleSignIn(): void {
    const { password, usarname } = this.form.getRawValue()

    const isDefaultCredentials =
      password === DEFAULT_CREDENTIALS.password && usarname === DEFAULT_CREDENTIALS.usarname

    if (isDefaultCredentials && this.form.valid) {
      putCookie(ACCESS_TOKEN_KEY, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
      this._router.navigate([ROUTE_PATHS.dashboard])
      this.form.reset()
    } else {
      this.errorMessage = true
      this.form.markAllAsTouched()
    }
  }

  handleTogglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }
}
