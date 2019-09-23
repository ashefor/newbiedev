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

  constructor(private http: HttpClient, private toastr: ToastrNotificationService) {
    // this.currentUSer = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value
  }

  registerUser(user: User ){
    return this.http.post(`${environment.usersURL}/register`, user)
  }
  // loginUser(username: string, password: string, keepLoggedIn: boolean) {
  //   if (!username || !password) {
  //     this.toastr.warningToaster('please enter a username')
  //     return;
  //   }
  //   if (username === 'admin') {
  //     this.currentUSer = {
  //       id: 1,
  //       userName: username,
  //       isAdmin: true
  //     }
  //     // this.toastr.successToaster('Welcome admin');
  //     localStorage.setItem('currentUser', JSON.stringify(this.currentUSer))
  //     if (keepLoggedIn === false) {
  //       setTimeout(() => {
  //         localStorage.removeItem('currentUser')
  //       }, 86400000)
  //     }
  //     return
  //   }
  //   this.currentUSer = {
  //     id: 2,
  //     userName: username,
  //     isAdmin: false
  //   }
  //   // this.toastr.successToaster(`welcome in ${username}`)
  //   localStorage.setItem('currentUser', JSON.stringify(this.currentUSer))
  //   if (keepLoggedIn === false) {
  //     setTimeout(() => {
  //       localStorage.removeItem('currentUser')
  //     }, 86400000)
  //   }
  // }
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
