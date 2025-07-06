import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization/authorization.service';
import { OrderService, Order } from '../order/order.service';
import { AlertsService } from '../shared/alerts.service';
import { User } from '../authorization/user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = null;
  recentOrders: Order[] = [];
  totalOrders = 0;
  isLoading = false;
  
  constructor(
    private alertService: AlertsService, 
    private authService: AuthorizationService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserData();
    this.loadUserStats();
  }

  loadUserData() {
  // Get user data from auth service
  this.authService.user.subscribe(userData => {
    console.log('User data from auth service:', userData); // Debug line
    this.user = userData;
  });
}

  loadUserStats() {
    this.isLoading = true;
    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        this.totalOrders = orders.length;
        // Get last 2 orders for display
        this.recentOrders = orders.slice(0, 2);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user stats:', error);
        this.isLoading = false;
      }
    });
  }

  navigateToOrders() {
    this.router.navigate(['/order-history']);
  }

  navigateToAccount() {
    // You can implement account settings later
    this.alertService.riseAlert('info', 'Funkcja w przygotowaniu');
  }

  navigateToAddresses() {
    // You can implement address management later
    this.alertService.riseAlert('info', 'Funkcja w przygotowaniu');
  }

  logout() {
    this.authService.logout();
    this.alertService.riseAlert('success', 'Pomyślnie wylogowano');
    this.router.navigate(['/']);
  }

  getRegistrationDate(): string {
    if (this.user?.createdAt) {
      return new Date(this.user.createdAt).toLocaleDateString('pl-PL');
    }
    return 'N/A';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pl-PL');
  }
}