/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieDBService } from './MovieDB.service';

describe('Service: MovieDB', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDBService]
    });
  });

  it('should ...', inject([MovieDBService], (service: MovieDBService) => {
    expect(service).toBeTruthy();
  }));
});
