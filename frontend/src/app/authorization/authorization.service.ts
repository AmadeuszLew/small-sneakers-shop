import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError} from 'rxjs'; //
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expireIn: string;
    localid: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthorizationService {
    // user = new Subject<User>();//this subject is a subject when u can subscribe, and get info whenever new data is emitted
    user = new BehaviorSubject<User>(null); // difference is this subject gives subscribes immediate access to previously emitted value
    private timer: any;
    constructor(private http: HttpClient, private router: Router) {}
    signup(email: string, password: string, ) {// http client doest nothing without subscribing, so lets return this prepared observable (it makes more sense cuz if we get an error message, we might wanna display it)
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey,
        {
            email,
            password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError),
        tap(resData => {// tap alows to preform some action, without changing the response
                this.handleAuthentication(resData.email, resData.idToken, +resData.expireIn, resData.localid);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
        {
            email,
            password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError),
        tap(resData => {// tap alows to preform some action, without changing the response
            this.handleAuthentication(resData.email, resData.idToken, +resData.expireIn, resData.localid);
            })
        );
    }
    logout() {
        this.user.next(null);
        this.router.navigate(['/']);
        localStorage.removeItem('userData');
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = null;
    }
    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        // if (loadUser.token){
        //     const expirationDuration= new Date(userData._tokenExpirationDate).getTime()- new Date().getTime()
        //     this.autoLogout(expirationDuration)
        //     this.user.next(loadUser);
        // }
    }
    private handleAuthentication(email: string, token: string, expiresIn: number, userId: string) {
        const expirationDate = new Date( new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        // this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));
        console.log('imhere');
    }
    // autoLogout(expirationDuration:number){
    //     this.timer=setTimeout(()=>{
    //         this.logout();
    //     }, expirationDuration)
    // }
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage); // throwError gets back observable that just contain our message now
            }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Istnieje już konto o podanym adresie';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Zbyt wiele prób, spróbuj później';
                break;
            case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
                errorMessage = 'email lub hasło niepoprawne';
                break;
            case 'USER_DISABLED':
                errorMessage = 'Twoje konto zostało zawieszone przez Administratora';
            }
        return throwError(errorMessage);
        }
}
