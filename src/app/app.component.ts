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
  title = 'zlatan';
  @ViewChild('navbar', {static: false}) navBar: ElementRef<HTMLElement>
  currentUser;
  constructor(private authservice: AuthService, private router: Router) {
    this.authservice.currentUser.subscribe((data: any) => this.currentUser = data?data.user: null)
    console.log(this.currentUser)
  }
  logOut() {
    this.authservice.logOut();
    this.navBar.nativeElement.classList.remove('show')
    this.router.navigate(['/auth/login'])
  }

  isActivated(componentRef){
    if(this.navBar.nativeElement.classList.contains('show')){
      this.navBar.nativeElement.classList.remove('show')
    }
  }
}
