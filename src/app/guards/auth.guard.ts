import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router, private authservice: AuthService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const currentUser = this.authservice.isLoggedIn
    return this.checkLoggedin(state.url);
  }

  checkLoggedin(url: string): boolean {
      if (this.authservice.currentUserValue) {
        return true;
      }
      this.authservice.redirectUrl = url;
      this.route.navigate(['/auth/login']);
      return false;
  }

}
