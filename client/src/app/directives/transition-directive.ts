import { Directive, HostBinding, effect } from '@angular/core';
import { inject, input, computed } from '@angular/core';
import { injectViewTransition } from '../services/view-transition.service';

@Directive({
  selector: '[appViewTransition]',
  standalone: true,
  host: { '[style.view-transition-name]': 'viewTransitionName()' },
})
export class ViewTransitionDirective {
  private readonly viewTranistionService = injectViewTransition();

  readonly name = input.required<string>({
    alias: 'appViewTransition',
  });
  readonly id = input.required<string>();

  protected readonly viewTransitionName = computed(() => {
    const currentTransition = this.viewTranistionService.currentTransition();

    const apply =
      currentTransition?.to.firstChild?.firstChild?.params['id'] ===
        this.id() ||
      currentTransition?.from.firstChild?.firstChild?.params['id'] ===
        this.id();
    return apply ? this.name() + this.id() : 'none';
  });
}
