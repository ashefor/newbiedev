import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { User } from './components/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'newbie';
  @ViewChild('navbar', {static: false}) navBar: ElementRef<HTMLElement>
  // public currentUser;
  currentUser;
  // thisUser: User
  constructor(private authservice: AuthService, private router: Router) {
    // this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')): '';
    this.authservice.currentUser.subscribe(data => this.currentUser = data)
  }

  // get isLoggedIn() {
  //   return this.authservice.isLoggedIn
  // }

  get userName() {
    if (this.authservice.currentUSer) {
      // return this.authservice.currentUSer.userName
      return this.authservice.currentUserValue.username
    }
    return ''
  }
  logOut() {
    this.authservice.logOut();
    this.navBar.nativeElement.classList.remove('show')
    // this.router.navigate(['/users/login'])
  }

  isActivated(componentRef){
    if(this.navBar.nativeElement.classList.contains('show')){
      this.navBar.nativeElement.classList.remove('show')
    }
  }
}
