import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'newbie';
  @ViewChild('navbar', {static: false}) navBar: ElementRef<HTMLElement>
  public currentUser;
  constructor(private authservice: AuthService, private router: Router) {
    this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')): '';
  }

  get isLoggedIn() {
    return this.authservice.isLoggedIn
  }

  get userName() {
    if (this.authservice.currentUSer) {
      return this.authservice.currentUSer.userName
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
