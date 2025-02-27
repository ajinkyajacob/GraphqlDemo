import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { catchError, of, tap, throwError } from 'rxjs';
import { injectStorage } from '../storage.service';
import { setContext } from '@apollo/client/link/context';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';

export interface User {
  jwt: string;
  email: string;
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apollo = inject(Apollo);
  storage = injectStorage();

  _userData = signal<User>(
    ['email', 'id', 'jwt', 'name'].reduce(
      (p, c) => ({ ...p, [c]: this.storage.getItem(c as keyof User) ?? '' }),
      {} as User,
    ),
  );
  userDataEffect = effect(() => {
    Object.entries(this._userData()).forEach(([key, value]) =>
      this.storage.setItem(key as keyof User, value),
    );
  });

  token = computed(() => this._userData()?.jwt ?? null);

  constructor() {}

  register(payload: { email: string; password: string }) {
    return this.apollo
      .mutate<{
        addUser: User;
      }>({
        mutation: gql`
          mutation resgister(
            $email: String!
            $password: String!
            $name: String!
          ) {
            addUser(email: $email, name: $name, password: $password) {
              id
              email
              name
              jwt
            }
          }
        `,
        variables: payload,
      })
      .pipe(
        tap(({ data }) => {
          // this.storage.setItem('jwt', data?.resgister.jwt ?? ''),
          //   this.updateHeader();
          this.setSessionData(data?.addUser);
        }),
      );
  }

  login(payload: { email: string; password: string }) {
    return this.apollo
      .mutate<{
        login: User;
      }>({
        mutation: gql`
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              id
              email
              name
              jwt
            }
          }
        `,
        variables: payload,
      })
      .pipe(
        tap(({ data, errors }) => {
          this.setSessionData(data?.login);
        }),
      );
  }

  private setSessionData(user: User | null | undefined) {
    console.log('jwt', user);
    const jwt = user?.jwt ?? '';
    const name = user?.name ?? '';
    const email = user?.email ?? '';
    const id = user?.id ?? '';
    this._userData.set({ jwt, name, email, id });
    // this.updateHeader();
  }

  updateHeader() {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: this.token() ? this.token() : '',
        },
      };
    });
    this.apollo.client.setLink(authLink.concat(this.apollo.client.link));
  }

  logout() {
    this.storage.clear();
    this._userData.set({ email: '', id: '', jwt: '', name: '' });
    this.apollo.client.resetStore();
  }
}

export function injectAuth() {
  return inject(AuthService);
}

export const authorizationInterceptor: HttpInterceptorFn = (r, n) => {
  const token = injectAuth().token();
  return n(
    r.clone({
      headers: r.headers.set('authorization', token),
    }),
  );
};

export const unAuthorizedInterceptor: HttpInterceptorFn = (r, n) => {
  const router = inject(Router);
  const auth = injectAuth();
  return n(r).pipe(
    tap({
      error: (e) => {
        if (e instanceof HttpErrorResponse) {
          if (e.status === 401 || e.status === 403) {
            //navigate /delete cookies or whatever
            auth.logout();
            router.navigateByUrl(`/login`);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
          }
        }
      },
    }),
  );
};
