import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sneaker } from './sneaker.model';
import { SneakserService } from './sneakers.service';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.css']
})
export class SneakersComponent implements OnInit {
  private sneakers:Sneaker[];

  constructor(private sneakerService: SneakserService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.sneakers = this.sneakerService.getAllSneakers();
    console.log(this.sneakers)
  }
  filterByModel(model:string){
    const snkrs=this.sneakers.filter((snkrs)=>{
      return snkrs.model.includes(model)
    })
  }
}
