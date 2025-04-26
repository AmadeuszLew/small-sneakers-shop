import { Component} from '@angular/core';
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
