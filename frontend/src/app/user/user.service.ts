import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';
import { Address } from 'app/authorization/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,
    private authService: AuthorizationService
  ) {}

  private getCurrentUserId(): string {
    const user = this.authService.user.value;
    if (!user) {
      throw new Error('User not authenticated');
    }
    return user.id;
  }

  getUserAddresses(): Observable<Address[]> {
    const userId = this.getCurrentUserId();
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Address[]>(`${this.baseUrl}/${userId}/addresses`, { headers });
  }

  addAddress(address: Address): Observable<Address[]> {
    const userId = this.getCurrentUserId();
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Address[]>(`${this.baseUrl}/${userId}/addresses`, address, { headers });
  }

  updateAddress(addressIndex: number, address: Address): Observable<any> {
    const userId = this.getCurrentUserId();
const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.baseUrl}/${userId}/addresses/${addressIndex}`, address, { headers });
  }

  deleteAddress(addressIndex: number): Observable<any> {
    const userId = this.getCurrentUserId();
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.baseUrl}/${userId}/addresses/${addressIndex}`, { headers });
  }

  setMainAddress(addressIndex: number): Observable<any> {
    const userId = this.getCurrentUserId();
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch(`${this.baseUrl}/${userId}/addresses/${addressIndex}/main`, {}, { headers });
  }

  private getAuthToken(): string {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData._token || '';
  }
}
