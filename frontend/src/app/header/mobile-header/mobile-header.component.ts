import {Component, inject, Input} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SearchService} from "../../shared/search.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.css'
})
export class MobileHeaderComponent {
  @Input() isUserLoggedIn: boolean = false;
  @Input() totalItems: number = 0;
  @Input() resetFiltersAndGoHome: () => void;

  searchText = '';

  private searchService: SearchService = inject(SearchService)

  onSearch(event: Event): void {
    event.preventDefault();
    this.searchService.performSearch(this.searchText);
    this.searchText = '';
  }
}
