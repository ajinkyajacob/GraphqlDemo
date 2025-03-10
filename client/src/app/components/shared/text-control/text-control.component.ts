import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-text-control',
  imports: [FormErrorComponent, ReactiveFormsModule],
  styleUrl: './text-control.component.css',
  host: {
    class:
      'block w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all',

    placeholder: 'placeholder()',
  },
  template: `
    <input
      class="outline-none w-full bg-transparent text-neutral-900 text-sm font-medium placeholder-neutral-500"
      [formControl]="control()"
      type="text"
      [placeholder]="placeholder()"
    />
    <app-form-error class="pl-2 pt-1" [control]="control()"></app-form-error>
  `,
})
export class TextControlComponent {
  control = input.required<FormControl>();
  placeholder = input.required<string>();
}
