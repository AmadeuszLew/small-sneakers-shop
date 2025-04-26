import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';

import { SizeChart } from '../shared/models/size-chart.model';
import { Sneaker } from './sneaker.model';
import { SneakserService } from './sneakers.service';
import {AppRestService} from '../app.rest.service';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 1 }),
        animate(200, style({opacity: 0.1})),
      ]),
      transition(':leave', [
        style({ opacity: 0.1 }),
        animate(200, style({opacity: 1})),
      ]),
    ]),
  ],
})
export class SneakersComponent implements OnInit, OnDestroy {
  sneakers: Sneaker[];
  private sneakersChangeSubscription: Subscription;

  constructor(private sneakerService: SneakserService, private readonly appRestService: AppRestService) {}

  ngOnInit() {
    this.appRestService.getAllSneakers()
      .subscribe((sneakers:Sneaker[]): void=>
      {
        this.sneakers = sneakers;}
      );
  }
  ngOnDestroy(): void{
    this.sneakersChangeSubscription.unsubscribe();
  }
  filterSnkrsByModel(model){
    this.sneakerService.filterByModel(model);
  }
  listSizes(sizes: SizeChart[]){
    const showSizes: number[] = [];
    if(!sizes){
      return 'Niedostepny';
    }
    for (const size of sizes){
      if (size.avability > 0) {
        showSizes.push(size.size);
      }
    }
    return showSizes.length > 3 ? 'Dostępny w wielu rozmiarach' : 'Dostępne rozmiary: ' + showSizes ;
  }
}
