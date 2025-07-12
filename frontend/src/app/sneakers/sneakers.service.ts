import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SizeChart } from '../shared/models/size-chart.model';
import { Sneaker } from './sneaker.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface BackendSneaker {
  id: string;
  sku: string;
  model: string;
  name: string;
  brand: string;
  colorway: string;
  price: number;
  imagePath: string;
  sizesOfShoe: { size: number; availability: number }[];
  onSale?: boolean;
}

interface FilterOptions {
  brand?: string;
  model?: string;
  onSale?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SneakersService {
  sneakersChanged = new Subject<Sneaker[]>();
  private sneakers: Sneaker[] = [];
  private baseUrl = 'http://localhost:8080/api/sneakers';
  private currentFilter: FilterOptions = {};

  constructor(private http: HttpClient) {
    this.loadSneakersFromAPI();
  }

  loadSneakersFromAPI(filter: FilterOptions = {}): void {
    this.currentFilter = { ...filter };

    let params = new HttpParams();
    if (filter.brand) params = params.append('brand', filter.brand);
    if (filter.model) params = params.append('model', filter.model);
    if (filter.onSale) params = params.append('onSale', filter.onSale.toString());

    this.http.get<BackendSneaker[]>(this.baseUrl, { params })
      .pipe(
        map(backendSneakers => backendSneakers.map(this.convertBackendSneakerToFrontend))
      )
      .subscribe({
        next: (sneakers) => {
          this.sneakers = sneakers;
          this.sneakersChanged.next(this.sneakers.slice());
        },
        error: (error) => {
          console.error('Error loading sneakers from API:', error);
          this.sneakers = [];
          this.sneakersChanged.next([]);
        }
      });
  }

  private convertBackendSneakerToFrontend(backendSneaker: BackendSneaker): Sneaker {
    const sizesAvailable = backendSneaker.sizesOfShoe.map(
      size => new SizeChart(size.size, size.availability)
    );

    return new Sneaker(
      backendSneaker.sku,
      backendSneaker.model,
      backendSneaker.name,
      backendSneaker.brand,
      backendSneaker.colorway,
      backendSneaker.price,
      backendSneaker.imagePath,
      sizesAvailable,
      backendSneaker.onSale
    );
  }

  getAllSneakers() {
    return this.sneakers.slice();
  }

  getSneaker(id: string) {
    return this.sneakers.find(x => x.sku === id);
  }

  getSneakerObservable(id: string): Observable<Sneaker | undefined> {
    if (this.sneakers.length > 0) {
      return new BehaviorSubject(this.getSneaker(id));
    } else {
      return this.sneakersChanged.pipe(
        map(() => this.getSneaker(id))
      );
    }
  }

  printSneakerName(sneaker: Sneaker) {
    return sneaker.model + ' ' + sneaker.name;
  }

  filterByBrand(brand: string): void {
    this.loadSneakersFromAPI({ ...this.currentFilter, brand });
  }

  filterByModel(model: string): void {
    this.loadSneakersFromAPI({ ...this.currentFilter, model });
  }

  showOnSaleOnly(onSale: boolean = true): void {
    this.loadSneakersFromAPI({ ...this.currentFilter, onSale });
  }

  resetFilters(): void {
    this.loadSneakersFromAPI({});
  }

  refreshSneakers(): void {
    this.loadSneakersFromAPI(this.currentFilter);
  }
}
