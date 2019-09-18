import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'newbie';

  constructor(private authservice: AuthService, private router: Router) {

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
    this.router.navigate(['/users/login'])
  }
}
