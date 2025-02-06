import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthorizationService } from "./authorization.service";

@Injectable({providedIn:'root'})
export class AuthorizationGuard {
    constructor(private authorizationService: AuthorizationService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authorizationService.user.pipe(take(1),map(user=>{
           const isAuthorized= !user? false:true;
           if (isAuthorized){
            return true;
           }
           return this.router.createUrlTree(['/authorization'])
        }))
    }
}