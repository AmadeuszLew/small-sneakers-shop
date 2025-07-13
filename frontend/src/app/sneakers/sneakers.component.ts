import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

import { SizeChart } from '../shared/models/size-chart.model';
import { Sneaker } from './sneaker.model';
import { SneakersService } from './sneakers.service';

interface FilterChip {
  type: string;  // 'brand', 'model', 'onSale'
  label: string; // Display text
  value: string; // Actual filter value
}

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 1 }),
        animate(200, style({opacity: 0.1}))
      ]),
      transition(':leave', [
        style({ opacity: 0.1 }),
        animate(200, style({opacity: 1}))
      ])
    ])
  ]
})
export class SneakersComponent implements OnInit, OnDestroy {
  sneakers: Sneaker[] = [];
  isLoading = true;
  activeFilters: FilterChip[] = [];
  private sneakersChangeSubscription: Subscription;

  constructor(
    private sneakerService: SneakersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.sneakers = this.sneakerService.getAllSneakers();

    this.sneakersChangeSubscription = this.sneakerService.sneakersChanged
      .subscribe(
        (sneakers: Sneaker[]) => {
          this.sneakers = sneakers;
          this.isLoading = false;
        }
      );

    this.route.queryParams.subscribe(params => {
      const filters: {[key: string]: string} = {};
      this.activeFilters = [];

      if (params['brand']) {
        filters.brand = params['brand'];
        this.activeFilters.push({
          type: 'brand',
          label: `Marka: ${params['brand']}`,
          value: params['brand']
        });
      }

      if (params['model']) {
        filters.model = params['model'];
        this.activeFilters.push({
          type: 'model',
          label: `Model: ${params['model']}`,
          value: params['model']
        });
      }

      if (params['onSale'] === 'true') {
        filters.onSale = params['onSale'];
        this.activeFilters.push({
          type: 'onSale',
          label: 'Tylko wyprzedaż',
          value: 'true'
        });
      }

      if (Object.keys(filters).length > 0) {
        this.applyFilters(filters);
      } else if (this.sneakers.length === 0) {
        this.isLoading = true;
        this.sneakerService.resetFilters();
      }
    });
  }

  ngOnDestroy(): void{
    this.sneakersChangeSubscription.unsubscribe();
  }

  applyFilters(filters: {[key: string]: string}): void {
    this.isLoading = true;

    const queryParams: any = {};
    if (filters.brand) queryParams.brand = filters.brand;
    if (filters.model) queryParams.model = filters.model;
    if (filters.onSale) queryParams.onSale = filters.onSale;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });

    this.sneakerService.loadSneakersFromAPI({
      brand: filters.brand,
      model: filters.model,
      onSale: filters.onSale === 'true'
    });
  }

  removeFilter(type: string): void {
    const currentParams = { ...this.route.snapshot.queryParams };
    delete currentParams[type];
    if(Object.keys(currentParams).length === 0) {
      this.clearAllFilters();
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: currentParams
    });
  }

  clearAllFilters(): void {
    this.isLoading = true;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
    this.sneakerService.resetFilters();
  }

  filterByBrand(brand: string): void {
    const filters = { ...this.route.snapshot.queryParams, brand };
    this.applyFilters(filters);
  }

  filterByModel(model: string): void {
    const filters = { ...this.route.snapshot.queryParams, model };
    this.applyFilters(filters);
  }

  toggleOnSale(): void {
    const currentParams = { ...this.route.snapshot.queryParams };
    const filters = {
      ...currentParams,
      onSale: currentParams['onSale'] === 'true' ? null : 'true'
    };
    if (!filters.onSale) delete filters.onSale;
    this.applyFilters(filters);
  }

  listSizes(sizes: SizeChart[]): string {
    const showSizes: number[] = [];
    for (const size of sizes){
      if (size.avability > 0) {
        showSizes.push(size.size);
      }
    }

    return showSizes.length > 5 ? 'Dostępny w wielu rozmiarach' : 'Dostępne rozmiary: ' + showSizes.join(', ') ;
  }
}
