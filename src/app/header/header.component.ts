import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';
import { CartService } from '../cart/cart.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Product} from '../cart/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  totalItems = 0;
  constructor(
              private cartService: CartService) { }

  ngOnInit() {
    this.cartService.productList
      .pipe(takeUntilDestroyed())
      .subscribe((sneaker: Product[]): void => {
        this.totalItems = sneaker.length;
    });
  }
}
