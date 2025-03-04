import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { AuthService } from './services/auth.service';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
