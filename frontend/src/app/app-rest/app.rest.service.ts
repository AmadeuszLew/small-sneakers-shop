import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Sneaker} from '../sneakers/sneaker.model';
import {environment} from '../../environments/environment.local';
import {Pagination} from './pagination.model';

@Injectable({
  providedIn: 'root',
})
export class AppRestService {
  http:HttpClient = inject(HttpClient);

  getAllSneakers(page: number = 0, size: number = 10): Observable<Pagination<Sneaker>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Pagination<Sneaker>>(`${environment.apiUrl}sneakers`, { params });
  }

  getSneakerBySku(sku: string): Observable<Sneaker> {
    return this.http.get<Sneaker>(`${environment.apiUrl}${sku}`);
  }

}
