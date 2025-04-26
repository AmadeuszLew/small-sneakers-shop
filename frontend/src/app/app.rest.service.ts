import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Sneaker} from './sneakers/sneaker.model';
import {environment} from '../environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class AppRestService {
  http:HttpClient = inject(HttpClient);

  getAllSneakers(): Observable<Sneaker[]> {
    return this.http.get<Sneaker[]>(`${environment.apiUrl}sneakers`);
  }

  getSneakerBySku(sku: string): Observable<Sneaker> {
    return this.http.get<Sneaker>(`${environment.apiUrl}${sku}`);
  }

}
