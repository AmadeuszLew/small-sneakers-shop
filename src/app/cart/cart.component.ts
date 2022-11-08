import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sneaker } from '../sneakers/sneaker.model';
import { CartService } from './cart.service';
import { Product } from './product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:Product[]=[];
  public sneakerAddedSubscription:Subscription;
  public grandTotal :number;
  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.products = this.cartService.getCartSneakers();
    this.sneakerAddedSubscription=this.cartService.productList.
    subscribe(
      (products:Product[])=>{
        this.products=products
      }
    )
    console.log(this.products)
  }
  ngOnDestroy():void{
    this.sneakerAddedSubscription.unsubscribe();
  }

}
