import {
  Component,
  computed,
  input,
  linkedSignal,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { injectMovieDB } from '../../../../services/MovieDB.service';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-movie-cast',
  templateUrl: './movie-cast.component.html',
  styleUrls: ['./movie-cast.component.css'],
  host: {
    class: 'block mb-8',
  },
  imports: [AsyncPipe],
})
export class MovieCastComponent {
  castNames = input.required<string[]>();
  movieDB = injectMovieDB();
  castProfileUrls = computed(() => {
    const castNames = this.castNames();
    if (castNames && castNames.length)
      return this.movieDB.getImageUrls(castNames);
    return [of(''), of('')];
  });
  ngOnChanges() {}
}
