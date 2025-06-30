import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AuthorizationService } from '../../authorization/authorization.service';

@Component({
  selector: 'app-sum-up',
  templateUrl: './sum-up.component.html',
  styleUrls: ['./sum-up.component.css']
})
export class SumUpComponent implements OnInit {
  @Input() grandTotal: number;
  isLoading = false;

  constructor(
    private cartService: CartService,
    private authService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  proceedToCheckout() {
    if (!this.authService.isAuthenticated()) {
      // Redirect to login if not authenticated
      this.router.navigate(['/authorization']);
      return;
    }

    // Navigate to checkout page
    this.router.navigate(['/checkout']);
  }

  getTotalWithShipping(): number {
    return this.cartService.getTotalWithShipping();
  }
}
