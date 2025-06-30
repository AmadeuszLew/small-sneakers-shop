import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService, Order } from '../order/order.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  error: string | null = null;
  orderNumber: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderNumber = params['orderNumber'];
      if (this.orderNumber) {
        this.loadOrder();
      } else {
        this.error = 'Brak numeru zamówienia';
        this.loading = false;
        
      }
    });
  }

  loadOrder(): void {
    if (!this.orderNumber) return;

    this.orderService.getOrderByNumber(this.orderNumber).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Nie udało się załadować szczegółów zamówienia';
        this.loading = false;
        console.error('Error loading order:', error);
      }
    });
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  viewOrderHistory(): void {
    this.router.navigate(['/order-history']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}