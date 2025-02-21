import { Component, inject } from '@angular/core';
import { MoviesService } from '../../movies.service';

@Component({
  selector: 'app-movies',
  imports: [],
  template: ` <p>movies works!</p> `,
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  moviesService = inject(MoviesService);
  constructor() {
    this.moviesService.getMovies({}).subscribe((x) => console.log(x.data));
  }
}
