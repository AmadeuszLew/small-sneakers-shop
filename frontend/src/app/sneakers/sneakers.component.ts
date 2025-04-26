import { Component,  OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

import { SizeChart } from '../shared/models/size-chart.model';
import { Sneaker } from './sneaker.model';
import {AppRestService} from '../app-rest/app.rest.service';
import {Pagination} from '../app-rest/pagination.model';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 1 }),
        animate(200, style({opacity: 0.1})),
      ]),
      transition(':leave', [
        style({ opacity: 0.1 }),
        animate(200, style({opacity: 1})),
      ]),
    ]),
  ],
})
export class SneakersComponent implements OnInit {
  sneakers: Sneaker[] = [];
  paginationInfo: Pagination<Sneaker>;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private readonly appRestService: AppRestService) {}

  ngOnInit() {
    this.loadSneakers(this.currentPage, this.pageSize);
  }

  loadSneakers(page: number, size: number): void {
    this.appRestService.getAllSneakers(page, size).subscribe({
      next: (pagination: Pagination<Sneaker>) => {
        this.paginationInfo = pagination;
        this.sneakers = pagination.content;
      },
      error: error => console.error('Error while loading snkrs sneakers:', error),
    });
  }
  listSizes(sizes: SizeChart[]) {
    const showSizes: number[] = [];
    if (!sizes) {
      return 'Niedostepny';
    }
    for (const size of sizes) {
      if (size.availability > 0) {
        showSizes.push(size.size);
      }
    }
    return showSizes.length > 3 ? 'Dostępny w wielu rozmiarach' : 'Dostępne rozmiary: ' + showSizes;
  }

  nextPage(): void {
    if (this.paginationInfo && !this.paginationInfo.last) {
      this.currentPage++;
      this.loadSneakers(this.currentPage, this.pageSize);
    }
  }
  previousPage(): void {
    if (this.paginationInfo && !this.paginationInfo.first) {
      this.currentPage--;
      this.loadSneakers(this.currentPage, this.pageSize);
    }
  }
}
