import {
  ApplicationConfig,
  provideZoneChangeDetection,
  inject,
  InjectionToken,
  APP_INITIALIZER,
  provideAppInitializer,
  EnvironmentProviders,
  makeEnvironmentProviders,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routerFeatures, routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment.development';
import {
  authorizationInterceptor,
  unAuthorizedInterceptor,
} from './services/auth.service';
import { injectStorage } from './storage.service';
import { provideServiceWorker } from '@angular/service-worker';
import { DatePipe } from '@angular/common';

export const GRAPHQL_BASE_URL = new InjectionToken<string>('GRAPHQL_BASE_URL');

const getEnvDetails = () => {
  return environment.baseUrl;
};
const provideGraphQlUrl = () =>
  makeEnvironmentProviders([
    {
      provide: GRAPHQL_BASE_URL,
      useFactory: getEnvDetails,
    },
  ]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, ...routerFeatures),

    provideAppInitializer(async () => {
      return fetch('./config.json').then(
        async (x) => (environment.baseUrl = (await x.json()).graphqlApi),
      );
    }),
    provideGraphQlUrl(),

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
    provideHttpClient(
      withInterceptors([authorizationInterceptor, unAuthorizedInterceptor]),
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
