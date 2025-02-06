import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

import { Product } from '../product.model';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
  constructor(private cartService: CartService) { }

  ngOnInit() {
  }
  removeFromCart(product: Product) {
    this.cartService.removeCartItem(product);
  }
}
