import { Component, effect, inject, input } from '@angular/core';
import { HeaderComponent } from './header.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { injectMoviesService } from '../../../movies.service';
import { map } from 'rxjs';

/* Don't forget to download the CSS file too
OR remove the styleUrls if you're already using Tailwind */

@Component({
  selector: 'app-movie-details',
  template: `
    <div class="w-auto bg-gray-100 min-h-[800px] font-sans">
      <main class="p-6">
        <div class="bg-white rounded-lg shadow-xl overflow-hidden">
          <div class="h-[400px] relative">
            <div
              class="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"
            ></div>
            <img
              [src]="data.value()?.imageUrl ? data.value()?.imageUrl : ''"
              alt="Movie Banner"
              class="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 banner"
            />
            <div class="absolute bottom-0 left-0 p-8 z-20 w-full">
              <div class="flex items-center space-x-4 mb-2">
                <span
                  class="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold"
                  >IMDB 8.7</span
                >
                <span
                  class="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >97% Fresh</span
                >
                <span
                  class="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >PG-13</span
                >
              </div>
              <h1 class="text-white text-5xl font-bold mb-2">
                {{ data.value()?.title }}
              </h1>
              <p class="text-gray-300 text-xl">
                2010 • Action, Sci-Fi, Thriller • 2h 28m
              </p>
              <div class="mt-4 flex space-x-4">
                <button
                  class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105 shadow-lg"
                >
                  <span class="material-symbols-outlined">play_arrow</span>
                  <span>Watch Trailer</span>
                </button>
                <button
                  class="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-bold flex items-center space-x-2 transition-all duration-300 hover:scale-105 border border-white/30"
                >
                  <span class="material-symbols-outlined">add</span>
                  <span>Add to Watchlist</span>
                </button>
              </div>
            </div>
          </div>
          <div class="p-8 grid grid-cols-3 gap-8">
            <div class="col-span-2">
              <h2 class="text-2xl font-bold mb-4">Overview</h2>
              <p class="text-gray-700 mb-6">
                {{ data.value()?.description }}
              </p>
              <div class="mb-8">
                <h2 class="text-2xl font-bold mb-4">Cast &amp; Crew</h2>
                <div class="grid grid-cols-4 gap-4">
                  <div
                    class="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 group"
                  >
                    <img
                      src="https://randomuser.me/api/portraits/men/40.jpg"
                      alt="Leonardo DiCaprio"
                      class="w-full h-40 object-cover rounded-md mb-2 group-hover:brightness-110"
                    />
                    <h3 class="font-bold">Leonardo DiCaprio</h3>
                    <p class="text-gray-600 text-sm">Dom Cobb</p>
                  </div>
                  <div
                    class="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 group"
                  >
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Joseph Gordon-Levitt"
                      class="w-full h-40 object-cover rounded-md mb-2 group-hover:brightness-110"
                    />
                    <h3 class="font-bold">Joseph Gordon-Levitt</h3>
                    <p class="text-gray-600 text-sm">Arthur</p>
                  </div>
                  <div
                    class="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 group"
                  >
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Ellen Page"
                      class="w-full h-40 object-cover rounded-md mb-2 group-hover:brightness-110"
                    />
                    <h3 class="font-bold">Ellen Page</h3>
                    <p class="text-gray-600 text-sm">Ariadne</p>
                  </div>
                  <div
                    class="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 group"
                  >
                    <img
                      src="https://randomuser.me/api/portraits/men/36.jpg"
                      alt="Tom Hardy"
                      class="w-full h-40 object-cover rounded-md mb-2 group-hover:brightness-110"
                    />
                    <h3 class="font-bold">Tom Hardy</h3>
                    <p class="text-gray-600 text-sm">Eames</p>
                  </div>
                </div>
              </div>
              <div class="mb-8">
                <h2 class="text-2xl font-bold mb-4">User Reviews</h2>
                <div
                  class="mb-4 bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                >
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="font-bold">MovieBuff42</h3>
                    <div class="flex">
                      <span class="material-symbols-outlined text-yellow-500"
                        >star</span
                      ><span class="material-symbols-outlined text-yellow-500"
                        >star</span
                      ><span class="material-symbols-outlined text-yellow-500"
                        >star</span
                      ><span class="material-symbols-outlined text-yellow-500"
                        >star</span
                      ><span class="material-symbols-outlined text-yellow-500"
                        >star</span
                      >
                    </div>
                  </div>
                  <p class="text-gray-700">
                    A mind-bending masterpiece that challenges perception and
                    reality. Nolan at his finest!
                  </p>
                </div>
                <div
                  class="mb-4 bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                >
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="font-bold">CinemaEnthusiast</h3>
                    <div class="flex">
                      <span class="material-symbols-outlined text-yellow-500"
                        >star</span
                      ><span class="material-symbols-outlined text-yellow-500"
                        >star</span
                      ><span class="material-symbols-outlined text-yellow-500"
                        >star</span
                      ><span class="material-symbols-outlined text-yellow-500"
                        >star</span
                      >
                      <span class="material-symbols-outlined text-gray-300"
                        >star</span
                      >
                    </div>
                  </div>
                  <p class="text-gray-700">
                    Visually stunning with an incredible score. The plot can be
                    confusing at times but rewards repeat viewings.
                  </p>
                </div>
                <button
                  class="mt-2 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center transition-all duration-300 transform hover:translate-x-1"
                >
                  <span>Read more reviews</span>
                  <span class="material-symbols-outlined ml-1"
                    >arrow_forward</span
                  >
                </button>
              </div>
            </div>
            <div>
              <div class="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <h2 class="text-xl font-bold mb-4">Movie Details</h2>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Director</span>
                    <span class="font-medium">Christopher Nolan</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Writers</span>
                    <span class="font-medium">Christopher Nolan</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Release Date</span>
                    <span class="font-medium">July 16, 2010</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Runtime</span>
                    <span class="font-medium">2h 28m</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Budget</span>
                    <span class="font-medium">$160 million</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Box Office</span>
                    <span class="font-medium">$836.8 million</span>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <h2 class="text-xl font-bold mb-4">Genres</h2>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 transition-colors duration-300 cursor-pointer"
                  >
                    Action </span
                  ><span
                    class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 transition-colors duration-300 cursor-pointer"
                  >
                    Sci-Fi </span
                  ><span
                    class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 transition-colors duration-300 cursor-pointer"
                  >
                    Thriller </span
                  ><span
                    class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 transition-colors duration-300 cursor-pointer"
                  >
                    Adventure </span
                  ><span
                    class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 transition-colors duration-300 cursor-pointer"
                  >
                    Mystery
                  </span>
                </div>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <h2 class="text-xl font-bold mb-4">Where to Watch</h2>
                <div class="grid grid-cols-3 gap-3">
                  <div
                    class="bg-white p-3 rounded-md text-center hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-2xl block mb-1"
                      >theaters</span
                    >
                    <span class="text-sm font-medium">Netflix</span>
                  </div>
                  <div
                    class="bg-white p-3 rounded-md text-center hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-2xl block mb-1"
                      >tv</span
                    >
                    <span class="text-sm font-medium">Prime</span>
                  </div>
                  <div
                    class="bg-white p-3 rounded-md text-center hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-2xl block mb-1"
                      >smart_display</span
                    >
                    <span class="text-sm font-medium">Hulu</span>
                  </div>
                  <div
                    class="bg-white p-3 rounded-md text-center hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-2xl block mb-1"
                      >airplay</span
                    >
                    <span class="text-sm font-medium">Disney+</span>
                  </div>
                  <div
                    class="bg-white p-3 rounded-md text-center hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-2xl block mb-1"
                      >hd</span
                    >
                    <span class="text-sm font-medium">HBO Max</span>
                  </div>
                  <div
                    class="bg-white p-3 rounded-md text-center hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-2xl block mb-1"
                      >connected_tv</span
                    >
                    <span class="text-sm font-medium">Apple TV</span>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-bold mb-4">Share</h2>
                <div class="flex space-x-4 justify-center">
                  <button
                    class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-transform duration-300 hover:scale-110"
                  >
                    <i class="fa-brands fa-facebook-f"></i>
                  </button>
                  <button
                    class="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white hover:bg-sky-600 transition-transform duration-300 hover:scale-110"
                  >
                    <i class="fa-brands fa-twitter"></i>
                  </button>
                  <button
                    class="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white hover:bg-pink-700 transition-transform duration-300 hover:scale-110"
                  >
                    <i class="fa-brands fa-instagram"></i>
                  </button>
                  <button
                    class="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-transform duration-300 hover:scale-110"
                  >
                    <i class="fa-brands fa-pinterest"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="p-8 bg-gray-50">
            <h2 class="text-2xl font-bold mb-6">
              Similar Movies You Might Like
            </h2>
            <div class="grid grid-cols-5 gap-6">
              <div
                class="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1608346128025-1896b97a6fa7?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                    alt="Interstellar"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <button
                      class="bg-white text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
                    >
                      <span class="material-symbols-outlined">play_arrow</span>
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-bold">Interstellar</h3>
                  <p class="text-gray-600 text-sm">2014</p>
                </div>
              </div>
              <div
                class="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                    alt="The Matrix"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <button
                      class="bg-white text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
                    >
                      <span class="material-symbols-outlined">play_arrow</span>
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-bold">The Matrix</h3>
                  <p class="text-gray-600 text-sm">1999</p>
                </div>
              </div>
              <div
                class="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1597002973885-8c90683fa6e0?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                    alt="Tenet"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <button
                      class="bg-white text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
                    >
                      <span class="material-symbols-outlined">play_arrow</span>
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-bold">Tenet</h3>
                  <p class="text-gray-600 text-sm">2020</p>
                </div>
              </div>
              <div
                class="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                    alt="Shutter Island"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <button
                      class="bg-white text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
                    >
                      <span class="material-symbols-outlined">play_arrow</span>
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-bold">Shutter Island</h3>
                  <p class="text-gray-600 text-sm">2010</p>
                </div>
              </div>
              <div
                class="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                    alt="Memento"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <button
                      class="bg-white text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
                    >
                      <span class="material-symbols-outlined">play_arrow</span>
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-bold">Memento</h3>
                  <p class="text-gray-600 text-sm">2000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer class="bg-gray-800 text-white p-8">
        <div class="max-w-7xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">MovieVerse</h3>
            <p class="text-gray-400">
              Your ultimate destination for movie information, reviews, and
              recommendations.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">Explore</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Top Movies</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >New Releases</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Coming Soon</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Movie News</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">Account</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >My Profile</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Watchlist</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Reviews</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Settings</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">Connect</h3>
            <div class="flex space-x-4 mb-4">
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors duration-300"
                ><i class="fa-brands fa-facebook text-xl"></i
              ></a>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors duration-300"
                ><i class="fa-brands fa-twitter text-xl"></i
              ></a>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors duration-300"
                ><i class="fa-brands fa-instagram text-xl"></i
              ></a>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors duration-300"
                ><i class="fa-brands fa-youtube text-xl"></i
              ></a>
            </div>
            <p class="text-gray-400">Subscribe to our newsletter</p>
            <div class="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                class="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                class="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div
          class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
        >
          <p>© 2023 MovieVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      .banner {
        view-transition-name: card-image;
      }
    `,
  ],
})
export class MovieDetailsComponent {
  id = input.required<string>();

  moviesService = injectMoviesService();

  data = rxResource({
    loader: ({ request }) =>
      this.moviesService
        .getMovieById({ id: request })
        .pipe(map((x) => x.data.movie)),
    request: () => this.id(),
  });

  ef = effect(() => console.log(this.data.value()));
}
