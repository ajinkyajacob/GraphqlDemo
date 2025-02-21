import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apollo = inject(Apollo);
  auth = inject(AuthService);

  getMovies(payload: any) {
    return this.apollo.watchQuery({
      query: gql`
        query {
          movies(page: 0, pageSize: 10) {
            data {
              title
              genre
              rating
              duration
            }
            totalCount
          }
        }
      `,
      variables: payload,
      context: { jwt: this.auth.token() },
    }).valueChanges;
  }
}
