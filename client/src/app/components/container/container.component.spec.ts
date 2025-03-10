import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { HeaderComponent } from '../movies/movie-details/header.component';
import { AuthService } from '../../services/auth.service';
import { provideRouter } from '@angular/router';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ComponentRef } from '@angular/core';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, ContainerComponent, HeaderComponent],
      providers: [provideRouter([]), AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain app-header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should contain router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
