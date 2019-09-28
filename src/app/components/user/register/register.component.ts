import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  constructor(private formbuilder: FormBuilder, private authservice: AuthService, private toastr: ToastrNotificationService, private router: Router) { }

  ngOnInit() {
    this.initialiseForm()
  }

  initialiseForm() {
    this.registerForm = this.formbuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      checked: ['', Validators.required]
    })
  }

  register() {
    if (this.registerForm && this.registerForm.valid) {
      const pwd1 = this.registerForm.get('password').value
      const pwd2 = this.registerForm.get('confirmPassword').value
      if (pwd1 === pwd2) {
        this.authservice.registerUser(this.registerForm.value).subscribe(data => {
          if (data) {
            this.toastr.successToaster('Sign up successful')
            this.router.navigate(['/posts'])
          }
        })
      }
    }
  }
}
