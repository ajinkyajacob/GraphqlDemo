import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { tap } from 'rxjs';
import { injectStorage } from '../storage.service';

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
      .mutate<{ resgister: { jwt: string } }>({
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
        tap(({ data }) =>
          this.storage.setItem('jwt', data?.resgister.jwt ?? ''),
        ),
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
          console.log('jwt', data);
          const jwt = data?.login?.jwt ?? '';
          const name = data?.login?.name ?? '';
          const email = data?.login?.email ?? '';
          const id = data?.login?.id ?? '';
          this._userData.set({ jwt, name, email, id });
        }),
      );
  }

  logout() {
    this.storage.clear();
  }
}
