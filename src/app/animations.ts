import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild,
  stagger,
  state
} from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Home => Room', [
      query(':enter, :leave',
        style({ position: 'absolute', width: '100%' , top: '45%' }),
        { optional: true }),
      group([
        query(':leave', [
          style({ transform:   'translateY(-0%)', opacity: 1 }),
          animate('1s ease-in-out',
            style({ transform: 'translateY(-200%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
  ]);

export const fadeInAfterLoad =
  trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(1000)),
  ]);
