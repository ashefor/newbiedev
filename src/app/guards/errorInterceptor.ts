import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastrNotificationService } from '../services/toastr-notification.service';


@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthService,
        private injector: Injector) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const toastr = this.injector.get(ToastrNotificationService)
        return next.handle(req).pipe(catchError((err: HttpErrorResponse)=>{
            console.log(err)
            toastr.errorToaster(err && err.error && err.error.message? err.error.message: 'An error occured')
            return throwError(err)
        }))
    }
}