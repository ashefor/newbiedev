import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/components/user/user';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authservice: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentuser = this.authservice.currentUserValue;
    if (currentuser && currentuser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: currentuser.token
        }
      });
    }
    return next.handle(request);
  }


}
