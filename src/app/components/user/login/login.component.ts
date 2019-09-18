import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(private authservice: AuthService,private formbuilder: FormBuilder, private router: Router, private toastr: ToastrNotificationService) { }

  ngOnInit() {
    this.initialiseForm()
  }
  initialiseForm(){
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      password: ['', Validators.required]
    })
  }

  getErrorMessage() {
    return this.loginForm.get('username').hasError('required') ? 'You must enter a value' :
        this.loginForm.get('username').hasError('minlength') ? 'Not a valid email' :
            '';
  }
  login(formvalue){
    if(this.loginForm && this.loginForm.valid){
      this.authservice.loginUser(formvalue.username, formvalue.password)
    this.router.navigateByUrl('/posts')
    }else{
      this.toastr.errorToaster('please enter a username and/or password')
    }
  }
}
