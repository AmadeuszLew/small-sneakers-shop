import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CartService } from '../cart.service';
import { AuthorizationService } from '../../authorization/authorization.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: Product[] = [];
  totalAmount = 0;
  isLoading = false;
  error: string | null = null;
  
  // Form data
  shippingAddress = '';
  customerName = '';
  
  constructor(
    private cartService: CartService,
    private authService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/authorization']);
      return;
    }

    // Check if cart is empty
    this.cartItems = this.cartService.getCartSneakers();
    if (this.cartItems.length === 0) {
      this.router.navigate(['/cart']);
      return;
    }

    this.totalAmount = this.cartService.getTotalWithShipping();
    
    // Pre-fill customer name from user data
    const user = this.authService.user.value;
    if (user) {
      this.customerName = `${user.firstName} ${user.lastName}`;
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.cartService.createOrderFromCart(this.shippingAddress, this.customerName)
      .subscribe({
        next: (order) => {
          this.cartService.clearCart();
          
          this.router.navigate(['/order-confirmation'], { 
            queryParams: { orderNumber: order.orderNumber } 
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.error = 'Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.';
          console.error('Order creation error:', error);
        }
      });
  }

  goBackToCart() {
    this.router.navigate(['/cart']);
  }
}