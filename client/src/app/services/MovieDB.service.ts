import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieDBService {
  http = inject(HttpClient);

  getImageUrl(name: string) {
    return this.http
      .get<{ results: Array<{ profile_path: string }> }>(
        'https://api.themoviedb.org/3/search/person',
        {
          params: { query: name },
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjljZDNhZWJmYWUwNDQ1NzVkNzg3NGRmMzM0Y2U0YSIsIm5iZiI6MTc0MTY3ODY2OS4yODgsInN1YiI6IjY3Y2ZlODRkMzYwMjAyNjkwNjgxMTcxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0BgsPSJLQq2pmtPTgaQjl7uJIEjIQ_DIHWVVbYoxY00',
          },
        },
      )
      .pipe(
        map(
          (x) => `https://image.tmdb.org/t/p/w500/${x.results[0].profile_path}`,
        ),
      );
  }

  getImageUrls(names: string[]) {
    return names.map((name) => this.getImageUrl(name));
  }
}

export function injectMovieDB() {
  return inject(MovieDBService);
}
