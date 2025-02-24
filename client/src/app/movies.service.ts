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
    return this.apollo.watchQuery<{
      movies: {
        data: Array<{
          title: string;
          description: string;
          imageUrl: string;
          time: string;
          year: string;
          rating: string;
        }>;
      };
    }>({
      query: gql`
        query movies($page: Int!, $pageSize: Int!) {
          movies(page: $page, pageSize: $pageSize) {
            data {
              id
              title
              description
              imageUrl
              rating
              time
              year
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
