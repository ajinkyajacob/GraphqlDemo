import {
  Component,
  computed,
  effect,
  input,
  linkedSignal,
  Signal,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-error',
  imports: [],
  template: `
    @for (item of errorsArr(); track $index) {
      <div>
        {{ item }}
      </div>
    }
  `,
  styleUrl: './form-error.component.css',
  host: {
    class: 'w-full text-sm text-red-600',
    '[style.display]]': 'hide()',
  },
})
export class FormErrorComponent {
  control = input.required<FormControl>();
  value = signal<any>(null);
  // valueChanges = toSignal(this.value());
  error = computed(() => {
    return this.control().errors;
  });
  hide = computed(() => {
    console.log(this.errorsArr());
    return this.control().touched && this.errorsArr().length !== 0;
  });
  eh = effect(() => console.log(this.hide()));
  errorsArr = computed(() => {
    const errorObj = this.error();
    if (errorObj) {
      return Object.keys(errorObj).map(
        (key) => message[key] ?? 'Error msg not defined',
      );
    } else {
      return [];
    }
  });

  constructor() {
    // this.control().valueChanges.subscribe((x) => this.value.set(x));
  }
}

const message: Record<string, string> = {
  required: 'filed required',
  confirmPasswordMismatch: 'Passwords do not match.',
};
