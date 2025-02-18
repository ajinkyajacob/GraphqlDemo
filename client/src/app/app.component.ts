import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GRAPHQL_BASE_URL } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  constructor(@Inject(GRAPHQL_BASE_URL) url:string ){
    console.log(url)
    // console.log(url)
    // console.log(url)
    // console.log(url)

  }
}
