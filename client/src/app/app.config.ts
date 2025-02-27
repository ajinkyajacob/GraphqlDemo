import {
  ApplicationConfig,
  provideZoneChangeDetection,
  inject,
  InjectionToken,
  APP_INITIALIZER,
  provideAppInitializer,
} from '@angular/core';
import {
  provideRouter,
  ViewTransitionInfo,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClient,
  HttpHeaders,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment.development';
import {
  authorizationInterceptor,
  injectAuth,
  unAuthorizedInterceptor,
} from './services/auth.service';
import { injectStorage } from './storage.service';
import { map } from 'rxjs';
import { ViewTransitionService } from './services/view-transition.service';

export const GRAPHQL_BASE_URL = new InjectionToken<string>('GRAPHQL_BASE_URL');

const getEnvDetails = () => {
  return environment.baseUrl;
};

function onViewTransitionCreated(info: ViewTransitionInfo): void {
  const viewTransitionService = inject(ViewTransitionService);
  console.log(info);
  viewTransitionService.currentTransition.set(info);

  info.transition.finished.finally(() => {
    viewTransitionService.currentTransition.set(null);
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions({ onViewTransitionCreated }),
      withComponentInputBinding(),
    ),
    provideHttpClient(
      withInterceptors([authorizationInterceptor, unAuthorizedInterceptor]),
    ),
    provideAppInitializer(async () => {
      // return inject(HttpClient)
      //   .get<{ graphqlApi: string }>('./config.json')
      //   .pipe(map((x) => (environment.baseUrl = x.graphqlApi)));
      return fetch('./config.json').then(
        async (x) => (environment.baseUrl = (await x.json()).graphqlApi),
      );
    }),
    {
      provide: GRAPHQL_BASE_URL,
      useFactory: getEnvDetails,
    },
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      const storage = injectStorage();

      const baseUrl = inject(GRAPHQL_BASE_URL);

      return {
        link: httpLink.create({
          uri: `${baseUrl}`,
        }),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
