import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { ToastrNotificationService } from './toastr-notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUSer: IUser
  constructor(private toastr: ToastrNotificationService) { }

  loginUser(username: string, password: string) {
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
      this.toastr.successToaster('Welcome admin');
      return
    }
    this.currentUSer = {
      id: 2,
      userName: username,
      isAdmin: false
    }
    this.toastr.successToaster(`welcome in ${username}`)
  }

  logOut() {
    this.currentUSer = null
  }
  get isLoggedIn(): boolean {
    return !!this.currentUSer
  }
}
