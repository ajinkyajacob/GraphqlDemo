import { inject } from '@angular/core';
import {
  Router,
  RouterFeatures,
  Routes,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
  ViewTransitionInfo,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { ContainerComponent } from './components/container/container.component';
import { injectViewTransition } from './services/view-transition.service';

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
    loadChildren: () =>
      import('./components/movies/movie.route').then((x) => x.movieRoutes),
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

export const routerFeatures: RouterFeatures[] = [
  withViewTransitions({ onViewTransitionCreated }),
  withComponentInputBinding(),
];

function onViewTransitionCreated(info: ViewTransitionInfo): void {
  const viewTransitionService = injectViewTransition();
  console.log(info);
  viewTransitionService.currentTransition.set(info);

  info.transition.finished.finally(() => {
    viewTransitionService.currentTransition.set(null);
  });
}
