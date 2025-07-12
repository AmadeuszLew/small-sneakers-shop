import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order } from '../../order/order.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  error: string | null = null;
  expandedOrderId: string | null = null;

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.error = null;

    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Nie udało się załadować zamówień';
        this.loading = false;
        console.error('Error loading orders:', error);
      }
    });
  }

  toggleOrderDetails(orderId: string): void {
    if (this.expandedOrderId === orderId) {
      this.expandedOrderId = null;
    } else {
      this.expandedOrderId = orderId;
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-warning text-dark';
      case 'confirmed': return 'bg-info';
      case 'shipped': return 'bg-primary';
      case 'delivered': return 'bg-success';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'Oczekujące';
      case 'confirmed': return 'Potwierdzone';
      case 'shipped': return 'Wysłane';
      case 'delivered': return 'Dostarczone';
      case 'cancelled': return 'Anulowane';
      default: return status;
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pl-PL');
  }

  calculateItemsTotal(order: Order): number {
    return order.totalAmount - 15; // Subtract shipping cost
  }
}
