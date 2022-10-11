import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { AuthorizationService } from '../authorization/authorization.service';
import { AlertsService } from '../shared/alerts.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private alertService: AlertsService, private authService: AuthorizationService) { }

  ngOnInit() {
    
  }
  logout(){
    this.authService.logout()
    this.alertService.riseAlert('success','pomyślnie wylogowano')
  }
}
