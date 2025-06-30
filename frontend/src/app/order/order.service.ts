import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  sneakerSku: string;
  size: number;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: string;
  customerName: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  orderNumber: string;
  items: OrderItemResponse[];
  totalAmount: number;
  status: string;
  orderDate: string;
  shippingAddress: string;
  customerName: string;
}

export interface OrderItemResponse {
  sneakerSku: string;
  sneakerName: string;
  sneakerBrand: string;
  size: number;
  quantity: number;
  price: number;
  imagePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  createOrder(orderData: CreateOrderRequest): Observable<Order> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<Order>(this.baseUrl, orderData, { headers });
  }

  getMyOrders(): Observable<Order[]> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Order[]>(`${this.baseUrl}/my-orders`, { headers });
  }

  getOrderByNumber(orderNumber: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderNumber}`);
  }

  private getAuthToken(): string {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData._token || '';
  }
}
