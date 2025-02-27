import { inject } from '@angular/core';
import {
  Router,
  Routes,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { ContainerComponent } from './components/container/container.component';

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
          : router.createUrlTree(['home']);
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
    path: 'home',
    component: ContainerComponent,
    canActivate: [() => inject(AuthService).token()],
    canActivateChild: [() => inject(AuthService).token()],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/movies/movies.component').then(
            (c) => c.MoviesComponent,
          ),
        canActivate: [() => inject(AuthService).token()],
      },
      {
        path: 'movies-details/:id',
        loadComponent: () =>
          import(
            './components/movies/movie-details/movie-details.component'
          ).then((c) => c.MovieDetailsComponent),
        canActivate: [() => inject(AuthService).token()],
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
  // {
  //   path: 'movies',
  //   loadComponent: () =>
  //     import('./components/movies/movies.component').then(
  //       (c) => c.MoviesComponent,
  //     ),
  //   canActivate: [() => inject(AuthService).token()],
  // },
  // {
  //   path: 'movies-details',
  //   loadComponent: () =>
  //     import('./components/movies/movie-details/movie-details.component').then(
  //       (c) => c.MovieDetailsComponent,
  //     ),
  //   canActivate: [() => inject(AuthService).token()],
  // },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
