import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { ToastrNotificationService } from './toastr-notification.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../components/user/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUSer;
  private currentUserSubject: BehaviorSubject<User>;
  public loggedInUser: Observable<User>
  constructor(private http: HttpClient, private toastr: ToastrNotificationService) {
    this.currentUSer = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
  }

  loginUser(username: string, password: string, keepLoggedIn: boolean) {
    if (!username || !password) {
      this.toastr.warningToaster('please enter a username')
      return;
    }
    if (username === 'admin') {
      this.currentUSer = {
        id: 1,
        userName: username,
        isAdmin: true
      }
      // this.toastr.successToaster('Welcome admin');
      localStorage.setItem('currentUser', JSON.stringify(this.currentUSer))
      if (keepLoggedIn === false) {
        setTimeout(() => {
          localStorage.removeItem('currentUser')
        }, 86400000)
      }
      return
    }
    this.currentUSer = {
      id: 2,
      userName: username,
      isAdmin: false
    }
    // this.toastr.successToaster(`welcome in ${username}`)
    localStorage.setItem('currentUser', JSON.stringify(this.currentUSer))
    if (keepLoggedIn === false) {
      setTimeout(() => {
        localStorage.removeItem('currentUser')
      }, 86400000)
    }
  }

  logOut() {
    this.currentUSer = null;
    localStorage.removeItem('currentUser')
  }
  public get isLoggedIn(): boolean {
    return !!this.currentUSer
  }
}
