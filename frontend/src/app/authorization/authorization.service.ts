import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError} from 'rxjs';
import { Address, User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    token: string;
    email: string;
    firstName: string;
    lastName: string;
    userId: string;
    addresses?: Address[];
    createdAt?: Date;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address?: string;
    phoneNumber?: string;
    addresses?: Address[];
}

@Injectable({providedIn: 'root'})
export class AuthorizationService {
    user = new BehaviorSubject<User>(null);
    private timer: any;
    private baseUrl = 'http://localhost:8080/api/auth';

    constructor(private http: HttpClient, private router: Router) {}

    signup(registerData: RegisterData) {
        return this.http.post<AuthResponseData>(`${this.baseUrl}/register`, registerData)
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.token,
                        3600,
                        resData.userId,
                        resData.firstName,
                        resData.lastName,
                        resData.createdAt
                    );
                })
            );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(`${this.baseUrl}/login`, { email, password })
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.token,
                        3600,
                        resData.userId,
                        resData.firstName,
                        resData.lastName,
                      resData.createdAt
                    );
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
            new Date(userData._tokenExpirationDate),
            userData.firstName,
            userData.lastName,
            userData.createdAt
        );
        if (loadUser.token) {
            this.user.next(loadUser);
        }
    }

    isAuthenticated(): boolean {
        return !!this.user.value?.token;
    }

    private handleAuthentication(email: string, token: string, expiresIn: number, userId: string, firstName: string, lastName: string, createdAt:Date) {
        const expirationDate = new Date( new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate, firstName, lastName, createdAt);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        console.log('User authenticated:', user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error) {
            return throwError(errorMessage);
        }

        if (errorRes.status === 400) {
            errorMessage = 'Invalid credentials or user already exists';
        } else if (errorRes.status === 401) {
            errorMessage = 'Authentication failed';
        }

        return throwError(errorMessage);
    }
}
