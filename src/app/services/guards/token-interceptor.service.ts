import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/components/user/user';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authservice: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // const currentUSer =  this.authservice.isLoggedIn;
    // if(currentUSer && currentUSer){
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${localStorage.getItem('currentUser')}`
    //     }
    //   })
    // }

    let currentuser = this.authservice.currentUserValue
    if(currentuser && currentuser.token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentuser.token}`
        }
      })
    }
    return next.handle(request)
  }


}
