import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { ToastrNotificationService } from './toastr-notification.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../components/user/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUSer;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>
  redirectUrl: string;

  constructor(private http: HttpClient, private toastr: ToastrNotificationService) {
    // this.currentUSer = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value
  }

  registerUser(user: User ){
    return this.http.post<any>(`${environment.usersURL}/register`, user).pipe(map(data=>{
      if(data && data.token){
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.currentUserSubject.next(data)
      }
      return data
    }))
  }

  loginUser(email: string, password: string){
    return this.http.post<any>(`${environment.usersURL}/login`, {email, password}).pipe(map(user => {
      if(user && user.token){
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.currentUserSubject.next(user)
      }
      return user;
    }))
  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null)
  }
  public get isLoggedIn(): boolean {
    return !!this.currentUSer
  }
}
