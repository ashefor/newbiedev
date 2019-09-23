import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  initialiseForm(){
    this.registerForm = this.formbuilder.group({
      name: [''],
      username: [''],
      email: [''],
      password: [''],
      // checked: []
    })
  }

  register(){
    this.authservice.registerUser(this.registerForm.value).subscribe(data => {
      if(data){
        this.toastr.successToaster('Sign up successful')
        this.router.navigate(['/auth/login'])
      }
    })
  }
}
