import { inject, Injectable, signal } from '@angular/core';
import { ViewTransitionInfo } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
class ViewTransitionService {
  currentTransition = signal<ViewTransitionInfo | null>(null);
}

export function injectViewTransition() {
  return inject(ViewTransitionService);
}
