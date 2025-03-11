import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from './auth.service';
import { Omdb, MoviePaginated, Movie } from '../../generated/graphql';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apollo = inject(Apollo);
  auth = inject(AuthService);

  getMovies(payload: { page: number; pageSize: number }) {
    return this.apollo.watchQuery<{
      movies: MoviePaginated;
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
              omdb {
                Poster
              }
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
      movie: Movie;
    }>({
      query: gql`
        query ($id: ID!) {
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
