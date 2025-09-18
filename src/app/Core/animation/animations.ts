import { trigger, transition, style, animate, state } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
    ])
]);
