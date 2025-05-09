import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

// Injectable({providedIn:'root'})
export class AlertsService {
  riseAlert(icon: any, title: any) {
    Swal.fire({
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer: 1500
    });
  }
}
