import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header
      class="bg-gradient-to-r from-indigo-900 to-purple-800 p-6 shadow-lg relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-black opacity-30"></div>
      <div class="relative z-10 flex justify-between items-center">
        <h1
          routerLink="home"
          class="text-white text-3xl font-bold cursor-pointer"
        >
          MovieVerse
        </h1>
        <div class="flex space-x-4">
          <button
            class="flex bg-transparent hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
            routerLink="home"
          >
            <span class="material-symbols-outlined align-middle mr-1"
              >home</span
            >
            Home
          </button>
          <button
            class="flex bg-transparent hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <span class="material-symbols-outlined align-middle mr-1"
              >movie</span
            >
            Movies
          </button>
          <button
            class="flex bg-transparent hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <span class="material-symbols-outlined align-middle mr-1">tv</span>
            TV Shows
          </button>
          <button
            class="flex bg-white text-purple-800 px-4 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-purple-100"
          >
            <span class="material-symbols-outlined align-middle mr-1"
              >search</span
            >
            Search
          </button>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
