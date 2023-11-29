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

export const DialogAnimation = trigger('dialog', [
  // animate in
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0.8)',
    }),
    animate(
      '0.2s ease-in-out',
      style({
        opacity: 1,
        transform: 'scale(1)',
      })
    ),
  ]),

  // animate out
  transition(':leave', [
    animate(
      '0.2s ease-in-out',
      style({
        opacity: 0,
        transform: 'scale(0.8)',
      })
    ),
  ]),
]);

export const BackgroundAnimation = trigger('background', [
  // animate in
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      '0.2s ease-in-out',
      style({
        opacity: 1,
      })
    ),
  ]),

  // animate out
  transition(':leave', [
    animate(
      '0.2s ease-in-out',
      style({
        opacity: 0,
      })
    ),
  ]),
]);
