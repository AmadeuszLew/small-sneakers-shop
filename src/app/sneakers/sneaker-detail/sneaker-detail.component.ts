import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { Product } from '../../cart/product.model';
import { Sneaker } from '../sneaker.model';
import { SneakserService } from '../sneakers.service';

@Component({
  selector: 'app-sneaker-detail',
  templateUrl: './sneaker-detail.component.html',
  styleUrls: ['./sneaker-detail.component.css']
})
export class SneakerDetailComponent implements OnInit {
  sneaker:Sneaker;
  sizePicked:number=0;
  constructor(private route: ActivatedRoute,
      private sneakerService: SneakserService, 
      private cartService: CartService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.sneaker=this.sneakerService.getSneaker(id)
    console.log(this.sneaker)
    console.log(this.sneakerService.getSneaker(id))
  }
  addToCart(product:Sneaker){
    console.log(this.sizePicked)
    console.log(product)
    let addProduct=new Product(product.sku,product.model,product.name,product.brand,product.colorway,product.price,product.imagePath,this.sizePicked)
    this.cartService.addToCart(addProduct)
  }
}
