import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';
import { ComponentRef } from '@angular/core';

describe('MovieCardComponent', () => {
  const data = {
    id: '67bc6821bd117cdc56158087',
    title: 'Avatar',
    description:
      'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyOTYyMzUxNl5BMl5BanBnXkFtZTcwNTg0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg',
    rating: '7.9',
    time: '162 min',
    year: '2009',
    __typename: 'Movie',
  };
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let componentRef: ComponentRef<MovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('data', data);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('data input should be initailized', () => {
    expect(component.data()).toBeTruthy();
  });

  it('data input should be valid', () => {
    expect(component.data()).toEqual(data);
  });

  it('imgUrl input should be valid', () => {
    expect(component.imgUrl()).toEqual(data.imageUrl);
  });
});
