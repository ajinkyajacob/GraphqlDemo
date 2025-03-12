import { Component, input } from '@angular/core';

@Component({
  selector: 'app-movie-genres',
  template: `
    <div class="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-bold mb-4">Genres</h2>
      <div class="flex flex-wrap gap-2">
        @for (genre of genres(); track $index) {
          <span
            class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 transition-colors duration-300 cursor-pointer"
          >
            {{ genre }}
          </span>
        }
      </div>
    </div>
  `,
  styleUrls: ['./movie-genres.component.css'],
})
export class MovieGenresComponent {
  genres = input.required<string[]>();
}
