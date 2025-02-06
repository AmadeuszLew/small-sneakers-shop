import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsService } from '../shared/alerts.service';
import { AuthorizationService, AuthResponseData } from './authorization.service';
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authorizationService: AuthorizationService, private router: Router, private alertService: AlertsService) { }

  ngOnInit() {
  }
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    // console.log(this.isLoginMode);
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {// if user changes disabled button manualy
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authorizationObs: Observable<AuthResponseData>; // to not repeat ourselfs in if/else

    if (this.isLoginMode) {
      console.log(this.isLoginMode);
      authorizationObs = this.authorizationService.login(email, password);
    } else {
      console.log(this.isLoginMode);
      authorizationObs = this.authorizationService.signup(email, password);
    }


    authorizationObs.subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/']);
        this.alertService.riseAlert('success', 'Zalogowano');
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
