import { Component, inject } from '@angular/core';
import { AuthService, injectAuth } from '../../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  form = new FormGroup({
    email: new FormControl<string | null>(null, {
      validators: [Validators.required, Validators.email],
    }),

    password: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
  });

  auth = injectAuth();

  login() {
    if (this.form.valid)
      this.auth.login(this.form.value as any).subscribe({
        next: ({ data }) => data && this.router.navigate(['home']),
      });
  }
}
