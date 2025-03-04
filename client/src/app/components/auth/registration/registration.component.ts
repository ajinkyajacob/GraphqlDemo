import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { AuthService, injectAuth } from '../../../services/auth.service';

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';
import { JsonPipe } from '@angular/common';

function confirmPasswordValidator(
  passwordField: string,
  confirmPasswordField: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordField)?.value;
    const confirmPassword = control.get(confirmPasswordField)?.value;

    if (password !== confirmPassword) {
      control
        .get(confirmPasswordField)
        ?.setErrors({ confirmPasswordMismatch: true });
    } else {
      control.get(confirmPasswordField)?.setErrors(null);
    }
    return null;
  };
}

@Component({
  selector: 'app-registration',
  imports: [RouterLink, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  auth = injectAuth();
  router = inject(Router);
  commmonValidators = [Validators.required];
  form = new FormGroup(
    {
      first: new FormControl<string>('', [...this.commmonValidators]),
      last: new FormControl<string>('', [...this.commmonValidators]),
      email: new FormControl<string>('', [...this.commmonValidators]),
      password: new FormControl<string>('', [...this.commmonValidators]),
      confirmPassword: new FormControl<string>('', [...this.commmonValidators]),
    },
    { validators: confirmPasswordValidator('password', 'confirmPassword') },
  );

  register() {
    if (this.form.valid) {
      const { email, first, last, password } = this.form.value;
      const payload = { email, password, name: `${first} ${last}` };
      this.auth.register(payload as any).subscribe({
        next: ({ data }) => data && this.router.navigate(['movies']),
      });
    }
  }
}
