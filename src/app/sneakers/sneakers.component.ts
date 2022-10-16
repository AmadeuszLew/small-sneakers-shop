import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations'

import { SizeChart } from '../shared/models/size-chart.model';
import { Sneaker } from './sneaker.model';
import { SneakserService } from './sneakers.service';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.css'],
  animations: [
    // trigger('slideInOut', [
    //   transition(':enter', [
    //     style({transform: 'translateY(100%)'}),
    //     animate('400ms ease-in', style({transform: 'translateY(0%)'}))
    //   ]),
    //   transition(':leave', [
    //     animate('400ms ease-in', style({transform: 'translateY(-100%)'}))
    //   ])
    // ]),
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
export class SneakersComponent implements OnInit,OnDestroy {
  sneakers:Sneaker[];
  private sneakersChangeSubscription:Subscription;
  private mouseOver: boolean = false 

  constructor(private sneakerService: SneakserService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.sneakers = this.sneakerService.getAllSneakers();
    this.sneakersChangeSubscription=this.sneakerService.sneakersChanged
      .subscribe(
        (sneakers:Sneaker[])=>{
          this.sneakers=sneakers
        }
      );
  }
  ngOnDestroy():void{
    this.sneakersChangeSubscription.unsubscribe();
  }
  filterSnkrsByModel(model){
    this.sneakerService.filterByModel(model)
  }
  logIt(){
    console.log(this.sneakers)
  }
  listSizes(sizes:SizeChart[]){
    let showSizes:number[]=[];
    for (let size of sizes){
      if (size.avability>0)
        showSizes.push(size.size)
    }
    return showSizes.length>3 ? 'Dostępny w wielu rozmiarach':'Dostępne rozmiary: '+showSizes ;
  }
}
