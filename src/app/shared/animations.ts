import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const ToggleMenu = trigger('toggleMenu', [
  state('hidden', style({ transform: 'translateX(100%)' })),
  state('visible', style({ transform: 'translateX(0)' })),
  transition('hidden => visible', animate('200ms ease-out')),
  transition('visible => hidden', animate('200ms ease-out')),
]);

export const ToggleVisivility = trigger('toggleVisibility', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-out', style({ opacity: 0.2 })),
  ]),
  transition(':leave', [
    style({ opacity: 0.2 }),
    animate('200ms ease-out', style({ opacity: 0 })),
  ]),
]);
