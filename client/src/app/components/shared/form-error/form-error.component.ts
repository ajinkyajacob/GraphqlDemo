import { Component, computed, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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
  host: {},
})
export class FormErrorComponent {
  error = input.required<ValidationErrors | null>();
  errorsArr = computed(() => {
    const errorObj = this.error();
    if (errorObj) {
      return Object.keys(errorObj).map(
        (key) => message[key] ?? 'Error msg not deffined',
      );
    } else {
      return [];
    }
  });
}

const message: Record<string, string> = {
  required: 'filed required',
  confirmPasswordMismatch: 'Passwords do not match.',
};
