import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../movies/movie-details/header.component';

@Component({
  selector: 'app-container',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="w-auto bg-neutral-50">
      <app-header />
      <router-outlet />
    </div>
  `,
  styleUrl: './container.component.css',
})
export class ContainerComponent {}
