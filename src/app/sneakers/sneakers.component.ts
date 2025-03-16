import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';

import { Sneaker } from './sneaker.model';
import { SneakserService } from './sneakers.service';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 1 }),
        animate(200, style({opacity: 0.1}))
      ]),
      transition(':leave', [
        style({ opacity: 0.1 }),
        animate(200, style({opacity: 1}))
      ])
    ])
  ]
})
export class SneakersComponent implements OnInit, OnDestroy {
  sneakers: Sneaker[];

  private sneakersChangeSubscription: Subscription;

  constructor(private sneakerService: SneakserService) {}

  ngOnInit(): void {
    this.sneakers = this.sneakerService.getAllSneakers();
    this.sneakersChangeSubscription = this.sneakerService.sneakersChanged
      .subscribe(
        (sneakers: Sneaker[]) => {
          this.sneakers = sneakers;
        }
      );
  }
  ngOnDestroy(): void {
    this.sneakersChangeSubscription.unsubscribe();
  }
}
