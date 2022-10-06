import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http'

interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expireIn:string,
    localid:string
}

@Injectable({providedIn:'root'})
export class AuthorizationService{
    constructor(private http:HttpClient){}
    signup(email:string,password:string,){//http client doest nothing without subscribing, so lets return this prepered observable (it makes more sense cuz if we get an error message, we might wanna display it)
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8s42F2OkYdjnX8LYpzbrKxi8VVV1sDu8',
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
    }
}