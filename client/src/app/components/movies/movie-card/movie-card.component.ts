import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  id = input<string>();
  data = input.required<{
    id: string;
    title: string;
    year: string;
    time: string;
    description: string;
    imageUrl?: string;
    rating: string;
  }>();

  imgUrl = computed(() =>
    this.data().imageUrl ? this.data().imageUrl : 'svgs/imagePlaceholder.svg',
  );

  onViewDetails = output<string>();
}
