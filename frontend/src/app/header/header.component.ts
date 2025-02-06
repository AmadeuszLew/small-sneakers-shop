import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAuthenticated = false;
  totalItems = 0;
  constructor(private authService: AuthorizationService,
              private cartService: CartService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
    this.cartService.productList.subscribe((sneaker) => {
      this.totalItems = sneaker.length;
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
