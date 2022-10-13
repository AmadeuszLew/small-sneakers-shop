import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

//Injectable({providedIn:'root'})
export class AlertsService{
  riseAlert(icon:any,title:any){
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      icon: icon,
      title: title,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    }).fire()
  }
}