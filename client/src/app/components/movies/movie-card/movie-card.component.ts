import { Component, computed, input, output } from '@angular/core';
import { Movie } from '../../../../generated/graphql';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  data = input.required<Movie>();

  imgUrl = computed(() =>
    this.data()?.imageUrl ? this.data()?.imageUrl : 'svgs/imagePlaceholder.svg',
  );

  onViewDetails = output<string>();
}
