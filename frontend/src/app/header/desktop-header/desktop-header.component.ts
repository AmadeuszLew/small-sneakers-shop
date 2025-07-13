import {Component, inject, Input} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SearchService} from "../../shared/search.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-desktop-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './desktop-header.component.html',
  styleUrl: './desktop-header.component.css'
})
export class DesktopHeaderComponent {
  @Input() isUserLoggedIn: boolean = false;
  @Input() totalItems: number = 0;
  @Input() filterByBrand: (brand: string) => void;
  @Input() filterByModelAndBrand: (model: string, brand: string) => void;
  @Input() showOnSale: () => void;
  @Input() logout: () => void;
  @Input() resetFiltersAndGoHome: () => void;

  searchText = '';

  private searchService: SearchService = inject(SearchService)

  onSearch(event: Event): void {
    event.preventDefault();
    this.searchService.performSearch(this.searchText);
    this.searchText = '';
  }
}
