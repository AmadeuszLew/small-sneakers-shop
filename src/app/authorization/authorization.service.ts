import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError} from 'rxjs';//
import { User } from "./user.model";
export interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expireIn:string,
    localid:string
    registered?:boolean;
}

@Injectable({providedIn:'root'})
export class AuthorizationService{
    user = new Subject<User>();
    constructor(private http:HttpClient){}
    signup(email:string,password:string,){//http client doest nothing without subscribing, so lets return this prepered observable (it makes more sense cuz if we get an error message, we might wanna display it)
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8s42F2OkYdjnX8LYpzbrKxi8VVV1sDu8',
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
    .pipe(catchError(this.handleError),
    tap(resData=>{//tap alows to preform some action, without changing the response
            this.handleAuthentication(resData.email,resData.idToken,+resData.expireIn,resData.localid)
        })
    );
    }

    login(email:string,password:string){
        return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8s42F2OkYdjnX8LYpzbrKxi8VVV1sDu8',
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(catchError(this.handleError),
        tap(resData=>{//tap alows to preform some action, without changing the response
            this.handleAuthentication(resData.email,resData.idToken,+resData.expireIn,resData.localid)
            })
        );
    }

    private handleAuthentication(email:string,token:string,expiresIn:number,userId:string){
        const expirationDate=new Date( new Date().getTime()+ +expiresIn*1000);
        const user= new User(email,userId,token,expirationDate);
        this.user.next(user);
    };

    private handleError(errorRes:HttpErrorResponse){
        let errorMessage='An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);//throwError gets back observable that just contain our message now
            }
        switch (errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage='Istnieje już konto o podanym adresie';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage='Zbyt wiele prób, spróbuj później';
                break;
            case 'EMAIL_NOT_FOUND'|| 'INVALID_PASSWORD':
                errorMessage='email lub hasło niepoprawne'
                break;
            case 'USER_DISABLED':
                errorMessage='Twoje konto zostało zawieszone przez Administratora'
            }
        return throwError(errorMessage);
        }
}