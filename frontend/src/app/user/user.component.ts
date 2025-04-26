import { Component } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { AlertsService } from '../shared/alerts.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {

  constructor(private alertService: AlertsService, private authService: AuthorizationService) { }

  logout(){
    // this.authService.logout();
    this.alertService.riseAlert('success', 'pomyślnie wylogowano');
  }
}
