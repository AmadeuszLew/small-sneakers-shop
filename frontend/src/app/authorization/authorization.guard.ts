import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable({providedIn:'root'})
export class AuthorizationGuard {
  constructor(private authorizationService: AuthorizationService, private router:Router){}

}
