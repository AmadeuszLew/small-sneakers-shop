import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../order/order.service';
import { AlertsService } from '../shared/alerts.service';
import { User, AuthorizationService } from '../authorization';
import { AddressManagementComponent } from './Addresses/address-management/address-management.component';
import { PersonalDataManagementComponent } from './personal-data-management/personal-data-management.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    AddressManagementComponent,
    PersonalDataManagementComponent,
    UserOrdersComponent
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = null;
  recentOrders: Order[] = [];
  totalOrders = 0;
  isLoading = false;
  activeSection = 'account';

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

  setActiveSection(section: string): void {
    this.activeSection = section;
    console.log('activeSection set to ', section, this.activeSection)
  }

  navigateToOrders() {
    this.router.navigate(['/order-history']);
  }

  logout() {
    this.authService.logout();
    this.alertService.riseAlert('success', 'Pomyślnie wylogowano');
    this.router.navigate(['/']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pl-PL');
  }
}
