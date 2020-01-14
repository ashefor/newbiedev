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
  checked = false;
  constructor(private authservice: AuthService,
              private formbuilder: FormBuilder, private router: Router, private toastr: ToastrNotificationService) { }

  ngOnInit() {
    this.initialiseForm();
  }
  initialiseForm() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [this.checked]
    });
  }

  getErrorMessage() {
    // tslint:disable-next-line
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }
  login(formvalue) {
    this.getErrorMessage();
    if (this.loginForm && this.loginForm.valid) {
      this.loading = true;
      this.authservice.loginUser(formvalue.username, formvalue.password).subscribe(data => {
        if (data) {
          this.loading = false;
          if (this.authservice.redirectUrl) {
            this.router.navigateByUrl(this.authservice.redirectUrl);
          } else {
            this.router.navigate(['/posts']);
          }
        }
      }, (error: any) => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  keepLoggedIn() {
    this.checked = ! this.checked;
  }
  togglePwd() {
    this.hide = !this.hide;
  }
}
