import { Component, input, OnInit } from '@angular/core';
import { Omdb, Ratings } from '../../../../../generated/graphql';

@Component({
  selector: 'app-movie-ratings',
  templateUrl: './movie-ratings.component.html',
  styleUrls: ['./movie-ratings.component.css'],
})
export class MovieRatingsComponent {
  ratings = input.required<Omdb['Ratings']>();
}
