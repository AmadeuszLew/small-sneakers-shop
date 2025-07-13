import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-side-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mobile-side-nav.component.html',
  styleUrl: './mobile-side-nav.component.css'
})
export class MobileSideNavComponent {
  @Input() isUserLoggedIn: boolean = false;
  
  // Expose functions for the parent component to call
  @Input() filterByBrand: (brand: string) => void;
  @Input() filterByModelAndBrand: (model: string, brand: string) => void;
  @Input() showOnSale: () => void;
  @Input() logout: () => void;
  
  closeSidebar() {
    const offcanvasEl = document.getElementById('mobile-side-nav');
    if (offcanvasEl) {
      const bsOffcanvas = window['bootstrap'].Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  }
  
  filterAndClose(method: Function, ...args: any[]) {
    method(...args);
    this.closeSidebar();
  }
}