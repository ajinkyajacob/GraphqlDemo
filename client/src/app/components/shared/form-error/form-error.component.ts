import {
  AfterViewInit,
  Component,
  computed,
  effect,
  input,
  linkedSignal,
  Signal,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [],
  template: `
    @if (hide()) {
      <div class="w-full text-sm text-red-600">
        @for (item of errorsArr(); track $index) {
          <div>
            {{ item }}
          </div>
        }
      </div>
    }
  `,
  styleUrl: './form-error.component.css',
})
export class FormErrorComponent implements AfterViewInit {
  control = input.required<FormControl>();
  value = signal<any>(null);
  error = computed(() => {
    this.value();
    return this.control().errors;
  });
  hide = computed(() => {
    this.value();
    return this.control().dirty && this.errorsArr().length !== 0;
  });
  errorsArr = computed(() => {
    const errorObj = this.error();
    if (errorObj) {
      return Object.keys(errorObj).map(
        (key) => message[key]() ?? 'Error msg not defined',
      );
    } else {
      return [];
    }
  });

  constructor() {}
  ngAfterViewInit(): void {
    this.control().valueChanges.subscribe((x) => this.value.set(x));
  }
}

const message: Record<string, () => string> = {
  required: () => 'filed required',
  confirmPasswordMismatch: () => 'Passwords do not match.',
};
