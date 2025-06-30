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
  
  constructor(
    private authorizationService: AuthorizationService, 
    private router: Router, 
    private alertService: AlertsService
  ) { }

  ngOnInit() {
  }
  
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null; // Clear any existing errors
  }
  
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    this.error = null;

    let authorizationObs: Observable<AuthResponseData>;    if (this.isLoginMode) {
      authorizationObs = this.authorizationService.login(email, password);
    } else {
      const firstName = form.value.firstName;
      const lastName = form.value.lastName;
      const registerData = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      };
      authorizationObs = this.authorizationService.signup(registerData);
    }

    authorizationObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/']);
        this.alertService.riseAlert('success', this.isLoginMode ? 'Zalogowano pomyślnie' : 'Konto zostało utworzone');
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    });
    
    form.reset();
  }
}
