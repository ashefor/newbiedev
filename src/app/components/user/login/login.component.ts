declare var swal: any;
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  loading;
  checked: boolean = false;
  constructor(private authservice: AuthService, private formbuilder: FormBuilder, private router: Router, private toastr: ToastrNotificationService) { }

  ngOnInit() {
    this.initialiseForm()
  }
  initialiseForm() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      password: ['', Validators.required],
      checked: [this.checked]
    })
  }

  getErrorMessage() {
    return this.loginForm.get('username').hasError('required') ? 'You must enter a value' :
      this.loginForm.get('username').hasError('minlength') ? 'Not a valid email' :
        '';
  }
  login(formvalue) {
    if (this.loginForm && this.loginForm.valid) {
      this.loading = true;
      this.authservice.loginUser(formvalue.username, formvalue.password).subscribe(data=>{
        if(data){
          this.loading = false
          this.toastr.successToaster("successful login")
          if(this.authservice.redirectUrl){
            this.router.navigateByUrl(this.authservice.redirectUrl)
          }else{
            this.router.navigate(['/posts'])
          }
        }
      },(error: any)=>{
        this.loading = false
      })
    } else {
      this.loading = false;
      this.toastr.errorToaster('please enter a username and/or password')
    }
  }

  keepLoggedIn(e) {
    this.checked = e.target.checked
  }

  togglePwd(){
    this.hide = !this.hide
  }
}
