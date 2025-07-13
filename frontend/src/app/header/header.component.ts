import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../authorization';
import { CartService } from '../cart/cart.service';
import { CommonModule } from '@angular/common';
import { DesktopHeaderComponent } from './desktop-header/desktop-header.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { MobileSideNavComponent } from './mobile-side-nav/mobile-side-nav.component';
import {SneakersService} from "../sneakers/sneakers.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    DesktopHeaderComponent,
    MobileHeaderComponent,
    MobileSideNavComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isUserLoggedIn = false;
  totalItems = 0;

  constructor(
    private authService: AuthorizationService,
    private cartService: CartService,
    private sneakersService: SneakersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isUserLoggedIn = !!user;
    });
    this.cartService.productList.subscribe((sneaker) => {
      this.totalItems = sneaker.length;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  filterByBrand(brand: string): void {
    this.router.navigate(['/'], {
      queryParams: { brand }
    });
  }

  filterByModelAndBrand(model: string, brand: string): void {
    this.router.navigate(['/'], {
      queryParams: { model, brand }
    });
  }

  showOnSale(): void {
    this.router.navigate(['/'], {
      queryParams: { onSale: 'true' }
    });
  }

  resetFiltersAndGoHome(): void {
  this.router.navigate(['/'], {
    queryParams: {}
  }).then(() => {
    this.sneakersService.resetFilters();
  });
}
}
