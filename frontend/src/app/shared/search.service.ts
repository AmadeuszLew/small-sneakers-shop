import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchPerformed = new Subject<string>();
  
  constructor(private router: Router) {}
  
  performSearch(searchText: string): void {
    if (searchText?.trim()) {
      this.router.navigate(['/'], {
        queryParams: { search: searchText }
      });
      this.searchPerformed.next(searchText);
    }
  }
}