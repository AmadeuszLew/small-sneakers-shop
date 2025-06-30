import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SizeChart } from '../shared/models/size-chart.model';
import { Sneaker } from './sneaker.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Backend API response interface (matches MongoDB structure)
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
}

@Injectable({ providedIn: 'root' })
export class SneakersService {
  sneakersChanged = new Subject<Sneaker[]>();
  private sneakers: Sneaker[] = [];
  private baseUrl = 'http://localhost:8080/api/sneakers';

  constructor(private http: HttpClient) {
    this.loadSneakersFromAPI();
  }
  private loadSneakersFromAPI(): void {
    this.http.get<BackendSneaker[]>(this.baseUrl)
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
          // Fallback to empty array if API fails
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
      sizesAvailable
    );
  }

  getAllSneakers() {
    return this.sneakers.slice();
  }
  // getSneaker(id:string){
  getSneaker(id: string) {
    return this.sneakers.find(x => x.sku === id);
  }

  // Observable method to get sneaker when data is ready
  getSneakerObservable(id: string): Observable<Sneaker | undefined> {
    if (this.sneakers.length > 0) {
      // Data already loaded
      return new BehaviorSubject(this.getSneaker(id));
    } else {
      // Wait for data to load
      return this.sneakersChanged.pipe(
        map(() => this.getSneaker(id))
      );
    }
  }

  printSneakerName(sneaker: Sneaker) {
    return sneaker.model + ' ' + sneaker.name;
  }
  filterByModel(model: string) {
    const snkrs = this.sneakers.filter((snkrs) => {
      return snkrs.model.toLowerCase().includes(model.toLowerCase());
    });
    this.sneakersChanged.next(snkrs);
  }

  filterByBrand(brand: string): void {
    const filteredSnkrs: Sneaker[] = this.sneakers.filter((snkrs) => {
      return snkrs.brand.toLowerCase().includes(brand.toLowerCase());
    });
    this.sneakersChanged.next(filteredSnkrs);
  }

  // Method to refresh data from API
  refreshSneakers(): void {
    this.loadSneakersFromAPI();
  }
}
