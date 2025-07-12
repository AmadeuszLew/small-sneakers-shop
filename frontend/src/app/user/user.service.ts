import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Address, User, UserUpdateRequest, AuthorizationService }  from '../authorization';

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

  getUserDetails(): Observable<User> {
    const userId = this.getCurrentUserId();
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.baseUrl}/${userId}`, { headers });
  }

  updateUserInfo(updateData: UserUpdateRequest): Observable<User> {
    const userId = this.getCurrentUserId();
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<User>(`${this.baseUrl}/${userId}`, updateData, { headers });
  }

  deactivateAccount(): Observable<any> {
    const userId = this.getCurrentUserId();
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch(`${this.baseUrl}/${userId}/deactivate`, {}, { headers });
  }

  deleteAccount(): Observable<any> {
    const userId = this.getCurrentUserId();
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.baseUrl}/${userId}`, { headers });
  }

  private getAuthToken(): string {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData._token || '';
  }
}
