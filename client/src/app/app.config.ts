import { ApplicationConfig, provideZoneChangeDetection, inject, InjectionToken, APP_INITIALIZER, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment.development';

export const GRAPHQL_BASE_URL = new InjectionToken<string>('GRAPHQL_BASE_URL')

const getEnvDetails = () => {
  return environment.baseUrl

}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(async () => {
      return fetch('./config.json').then(async x => environment.baseUrl = (await x.json()).graphqlApi)
    }),
    {
      provide: GRAPHQL_BASE_URL,
      useFactory:getEnvDetails
    },
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      
      const baseUrl = inject(GRAPHQL_BASE_URL);

      return {
        link: httpLink.create({
          uri: `${baseUrl}/graphql`,
        }),
        cache: new InMemoryCache(),
      };
    }),
  ]
};
