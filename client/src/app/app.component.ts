import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: ` <router-outlet /> `,
  styleUrl: './app.component.css',
  imports: [RouterOutlet],
})
export class AppComponent {
}
