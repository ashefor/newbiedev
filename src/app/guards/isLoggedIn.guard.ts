import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
// tslint:disable-next-line: class-name
export class isLoggedInGuard implements CanActivate {

    constructor(private authservice: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['/posts']);
            return false;
        } else {
            return true;
        }
    }
}
