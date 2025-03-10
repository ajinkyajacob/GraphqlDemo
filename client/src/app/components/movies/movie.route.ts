import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const movieRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../components/movies/movies.component').then(
        (c) => c.MoviesComponent,
      ),
    canActivate: [() => inject(AuthService).token()],
  },
  {
    path: 'movies-details/:id',
    loadComponent: () =>
      import(
        '../../components/movies/movie-details/movie-details.component'
      ).then((c) => c.MovieDetailsComponent),
    canActivate: [() => inject(AuthService).token()],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
