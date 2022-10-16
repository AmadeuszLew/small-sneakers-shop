import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sneaker } from '../sneaker.model';
import { SneakserService } from '../sneakers.service';

@Component({
  selector: 'app-sneaker-detail',
  templateUrl: './sneaker-detail.component.html',
  styleUrls: ['./sneaker-detail.component.css']
})
export class SneakerDetailComponent implements OnInit {
  sneaker:Sneaker;
  constructor(private route: ActivatedRoute,
      private sneakerService: SneakserService, ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.sneaker=this.sneakerService.getSneaker(id)
    console.log(this.sneaker)
    console.log(this.sneakerService.getSneaker(id))
  }
  
}
