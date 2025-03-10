import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apollo = inject(Apollo);
  auth = inject(AuthService);

  getMovies(payload: { page: number; pageSize: number }) {
    return this.apollo.watchQuery<{
      movies: {
        data: Array<{
          id: string;
          title: string;
          description: string;
          imageUrl: string;
          time: string;
          year: string;
          rating: string;
        }>;
        totalRecords: number;
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
            totalRecords
          }
        }
      `,
      variables: payload,
      context: { jwt: this.auth.token() },
    }).valueChanges;
  }

  getMovieById(payload: { id: string }) {
    return this.apollo.watchQuery<{
      movie: {
        id: string;
        title: string;
        description: string;
        imageUrl: string;
        time: string;
        year: string;
        rating: string;
      };
    }>({
      query: gql`
        query ($id: String!) {
          movie(id: $id) {
            id
            title
            description
            imageUrl
            time
            year
            rating
            omdb {
              Awards
              Actors
              Country
              Director
              Genre
              Language
              Metascore
              Plot
              Poster
              Production
              Rated
              Ratings {
                Source
                Value
              }
              Rated
              Year
            }
          }
        }
      `,
      variables: payload,
      context: { jwt: this.auth.token() },
    }).valueChanges;
  }
}

export function injectMoviesService() {
  return inject(MoviesService);
}
