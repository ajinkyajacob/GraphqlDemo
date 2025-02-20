import { inject, Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { tap } from "rxjs";
import { injectStorage } from "../storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  apollo = inject(Apollo);
  storage = injectStorage();

  register(payload: { username: string; password: string }) {
    return this.apollo
      .watchQuery<{ jwt: string }>({
        query: gql`
          query {
            jwt
          }
        `,
        context: payload,
      })
      .valueChanges.pipe(
        tap(({ data }) => this.storage.setItem("jwt", data.jwt)),
      );
  }

  login(payload: { email: string; password: string }) {
    return this.apollo
      .mutate<{ login: { jwt: string } }>({
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
          console.log("jwt", data);
          return (
            data?.login?.jwt &&
            this.storage.setItem("jwt", data?.login?.jwt ?? "")
          );
        }),
      );
  }

  logout() {
    this.storage.clear();
  }
}
