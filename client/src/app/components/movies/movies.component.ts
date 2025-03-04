import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { injectMoviesService } from '../../movies.service';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { ViewTransitionDirective } from '../../directives/transition-directive';

@Component({
  selector: 'app-movies',
  imports: [MovieCardComponent, ViewTransitionDirective],
  template: `
    <div class="w-auto p-8 bg-neutral-50">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (item of data.value(); track item.id) {
          <app-movie-card
            [data]="item"
            appViewTransition="card-image"
            [id]="item.id"
            (onViewDetails)="
              router.navigate(['home', 'movies-details', $event])
            "
          />
        }
        <!-- <div
          class="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.03] hover:rotate-1 transition-all duration-500 border border-neutral-100 group"
        >
          <div class="relative">
            <img
              src="https://webcrumbs.cloud/placeholder"
              alt="Movie Poster"
              class="w-full h-[350px] object-cover group-hover:brightness-110 transition-all duration-500"
            />
            <span
              class="absolute top-4 right-4 bg-primary-600/90 text-white px-3 py-1 rounded-full backdrop-blur-sm animate-pulse"
              >9.0</span
            >
          </div>
          <div class="p-8">
            <h3
              class="text-2xl font-bold mb-3 hover:text-primary-600 transition-colors group-hover:translate-x-2 duration-500"
            >
              The Dark Knight
            </h3>
            <div class="flex items-center mb-4 text-neutral-600">
              <span
                class="material-symbols-outlined text-primary-500 group-hover:rotate-180 transition-all duration-700"
                >calendar_month</span
              >
              <span
                class="ml-2 group-hover:translate-x-1 transition-all duration-300"
                >2008</span
              >
              <span class="mx-3 text-neutral-300">|</span>
              <span
                class="material-symbols-outlined text-primary-500 group-hover:rotate-180 transition-all duration-700"
                >schedule</span
              >
              <span
                class="ml-2 group-hover:translate-x-1 transition-all duration-300"
                >152 min</span
              >
            </div>
            <p
              class="text-neutral-600 mb-6 line-clamp-3 group-hover:translate-y-1 transition-all duration-500"
            >
              When the menace known as the Joker wreaks havoc and chaos on the
              people of Gotham, Batman must accept one of the greatest
              psychological and physical tests of his ability to fight
              injustice.
            </p>
            <button
              class="w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 active:bg-primary-800 transition-all duration-300 shadow-lg hover:shadow-primary-500/20 group-hover:scale-105"
            >
              View Details
            </button>
          </div>
        </div>
        <div
          class="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.03] hover:rotate-1 transition-all duration-500 border border-neutral-100 group"
        >
          <div class="relative">
            <img
              src="https://webcrumbs.cloud/placeholder"
              alt="Movie Poster"
              class="w-full h-[350px] object-cover group-hover:brightness-110 transition-all duration-500"
            />
            <span
              class="absolute top-4 right-4 bg-primary-600/90 text-white px-3 py-1 rounded-full backdrop-blur-sm animate-pulse"
              >8.8</span
            >
          </div>
          <div class="p-8">
            <h3
              class="text-2xl font-bold mb-3 hover:text-primary-600 transition-colors group-hover:translate-x-2 duration-500"
            >
              Inception
            </h3>
            <div class="flex items-center mb-4 text-neutral-600">
              <span
                class="material-symbols-outlined text-primary-500 group-hover:rotate-180 transition-all duration-700"
                >calendar_month</span
              >
              <span
                class="ml-2 group-hover:translate-x-1 transition-all duration-300"
                >2010</span
              >
              <span class="mx-3 text-neutral-300">|</span>
              <span
                class="material-symbols-outlined text-primary-500 group-hover:rotate-180 transition-all duration-700"
                >schedule</span
              >
              <span
                class="ml-2 group-hover:translate-x-1 transition-all duration-300"
                >148 min</span
              >
            </div>
            <p
              class="text-neutral-600 mb-6 line-clamp-3 group-hover:translate-y-1 transition-all duration-500"
            >
              A thief who steals corporate secrets through the use of
              dream-sharing technology is given the inverse task of planting an
              idea into the mind of a C.E.O.
            </p>
            <button
              class="w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 active:bg-primary-800 transition-all duration-300 shadow-lg hover:shadow-primary-500/20 group-hover:scale-105"
            >
              View Details
            </button>
          </div>
        </div>
        <div
          class="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.03] hover:rotate-1 transition-all duration-500 border border-neutral-100 group"
        >
          <div class="relative">
            <img
              src="https://webcrumbs.cloud/placeholder"
              alt="Movie Poster"
              class="w-full h-[350px] object-cover group-hover:brightness-110 transition-all duration-500"
            />
            <span
              class="absolute top-4 right-4 bg-primary-600/90 text-white px-3 py-1 rounded-full backdrop-blur-sm animate-pulse"
              >8.6</span
            >
          </div>
          <div class="p-8">
            <h3
              class="text-2xl font-bold mb-3 hover:text-primary-600 transition-colors group-hover:translate-x-2 duration-500"
            >
              Interstellar
            </h3>
            <div class="flex items-center mb-4 text-neutral-600">
              <span
                class="material-symbols-outlined text-primary-500 group-hover:rotate-180 transition-all duration-700"
                >calendar_month</span
              >
              <span
                class="ml-2 group-hover:translate-x-1 transition-all duration-300"
                >2014</span
              >
              <span class="mx-3 text-neutral-300">|</span>
              <span
                class="material-symbols-outlined text-primary-500 group-hover:rotate-180 transition-all duration-700"
                >schedule</span
              >
              <span
                class="ml-2 group-hover:translate-x-1 transition-all duration-300"
                >169 min</span
              >
            </div>
            <p
              class="text-neutral-600 mb-6 line-clamp-3 group-hover:translate-y-1 transition-all duration-500"
            >
              A team of explorers travel through a wormhole in space in an
              attempt to ensure humanity&#x27;s survival.
            </p>
            <button
              class="w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 active:bg-primary-800 transition-all duration-300 shadow-lg hover:shadow-primary-500/20 group-hover:scale-105"
            >
              View Details
            </button>
          </div>
        </div> -->
      </div>
    </div>
  `,
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  moviesService = injectMoviesService();
  router = inject(Router);

  page = signal({
    page: 0,
    pageSize: 9,
  });

  data = rxResource({
    loader: ({ request }) =>
      this.moviesService
        .getMovies(request)
        .pipe(map((x) => x.data.movies.data)),
    request: () => this.page(),
  });
}
