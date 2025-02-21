import { inject } from '@angular/core';
import {
  Router,
  Routes,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (c) => c.LoginComponent,
      ),
    canActivate: [
      () => {
        const router = inject(Router);
        return !inject(AuthService).token()
          ? true
          : router.createUrlTree(['movies']);
      },
    ],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/registration/registration.component').then(
        (c) => c.RegistrationComponent,
      ),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./components/movies/movies.component').then(
        (c) => c.MoviesComponent,
      ),
    canActivate: [() => inject(AuthService).token()],
  },
];
