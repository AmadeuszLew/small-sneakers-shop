import { Injectable } from '@angular/core';
import Swal, {SweetAlertIcon} from 'sweetalert2';

Injectable({providedIn:'root'});
export class AlertsService {
  riseAlert(icon: SweetAlertIcon, title: string) {
    Swal.fire({
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
