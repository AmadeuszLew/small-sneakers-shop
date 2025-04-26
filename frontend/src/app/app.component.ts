import { Component } from '@angular/core';
import { AuthorizationService } from './authorization/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthorizationService){}
  // title = 'small-sneakers-shop';
  // ngOnInit(): void {
  //   // this.authService.autoLogin();
  // }
}
