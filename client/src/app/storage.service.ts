import { inject, Injectable } from '@angular/core';
import { User } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService<T extends Record<string, any> = any>
  implements Storage
{
  get length() {
    return localStorage.length;
  }

  clear(): void {
    localStorage.clear();
  }

  getItem<K extends keyof T>(key: K): T[K] | null {
    const item = localStorage.getItem(String(key));
    return item ? (JSON.parse(item) as T[K]) : null;
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  removeItem<K extends keyof T>(key: K): void {
    localStorage.removeItem(String(key));
  }

  setItem<K extends keyof T>(key: K, value: T[K]): void {
    localStorage.setItem(String(key), JSON.stringify(value));
  }
}

export function injectStorage() {
  return inject<StorageService<User>>(StorageService);
}
