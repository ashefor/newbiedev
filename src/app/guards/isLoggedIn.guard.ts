import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class isLoggedInGuard implements CanActivate {
    
    constructor(private authservice: AuthService, private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(localStorage.getItem('currentUser')){
            return true;
        }else{
            this.router.navigate(['auth/login'], {queryParams: {returnUrl: state.url}})
            return false;
        }
    }
}