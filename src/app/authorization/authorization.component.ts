import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { AuthorizationService } from './authorization.service';
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  isLoginMode=true;
  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit() {
  }
  switchMode(){
    this.isLoginMode=!this.isLoginMode;
    console.log(this.isLoginMode);
  }
  onSubmit(form:NgForm){
    if (!form.valid){//if user changes disabled button manualy
      return;
    }
    const email=form.value.email;
    const password=form.value.password;
    
    if(this.isLoginMode){
      //..
    }else{
      this.authorizationService.signup(email,password).subscribe(resData=>{
        console.log(resData);
      },
      error=>{
        console.log(error);
      }
      );
    }

    
    form.reset();
  }
}
