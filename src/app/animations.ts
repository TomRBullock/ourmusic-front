import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild,
  stagger
} from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Home => *', [
      query(':enter, :leave',
        style({ position: 'absolute', width: '100%' , top: '45%' }),
        { optional: true }),
      group([
        query(':enter',[
          style({ transform: 'translateY(200%)', opacity: 0 }),
            animate('2.5s ease-in-out',
              style({ transform: 'translateY(-225%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform:   'translateY(-0%)', opacity: 1 }),
          animate('1s ease-in-out',
            style({ transform: 'translateY(-200%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
  ]);
