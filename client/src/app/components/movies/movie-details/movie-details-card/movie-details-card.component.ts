import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Omdb } from '../../../../../generated/graphql';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-details-card',
  template: `
    <div class="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-bold mb-4">Movie Details</h2>
      @if (details(); as details) {
        <div class="space-y-3">
          @for (details of detailsComputed(); track $index) {
            @if (details.value) {
              <div class="flex justify-between">
                <span class="text-gray-600">{{ details.label }}</span>
                <span class="font-medium">
                  @if (isArray(details.value)) {
                    @for (item of details.value; track $index) {
                      <span> {{ item }} </span><br />
                    }
                  } @else {
                    <span> {{ details.value }} </span>
                  }
                </span>
              </div>
            }
          }
        </div>
      }
    </div>
  `,
  styleUrls: ['./movie-details-card.component.css'],
  providers: [DatePipe],
})
export class MovieDetailsCardComponent {
  private datePipe = inject(DatePipe);
  details =
    input.required<
      Pick<Omdb, 'Director' | 'Writer' | 'Released' | 'Runtime' | 'BoxOffice'>
    >();

  detailsComputed = computed(() => {
    const details = this.details();
    return [
      {
        label: 'Director',
        value: details.Director,
      },
      {
        label: 'Writer',
        value: details.Writer?.split(', '),
      },
      {
        label: 'Released',
        value: this.datePipe.transform(details.Released),
      },
      {
        label: 'Runtime',
        value: details.Runtime,
      },
      {
        label: 'Box Office',
        value: details.BoxOffice,
      },
    ];
  });
  isArray = Array.isArray;
}
