import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { Product } from './product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  public sneakerAddedSubscription: Subscription;
  public grandTotal: number;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.products = this.cartService.getCartSneakers();
    this.sneakerAddedSubscription = this.cartService.productList.
    subscribe(
      (products: Product[]) => {
        this.products = products;
        this.grandTotal = this.cartService.getTotal();
      }
    );
    console.log(this.products);
  }
  ngOnDestroy(): void{
    this.sneakerAddedSubscription.unsubscribe();
  }
}
