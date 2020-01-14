import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private formbuilder: FormBuilder,
              private authservice: AuthService, private toastr: ToastrNotificationService, private router: Router) { }

  ngOnInit() {
    this.initialiseForm();
  }

  initialiseForm() {
    this.registerForm = this.formbuilder.group({
      name: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      checkPassword: [null, Validators.compose([Validators.required, Validators.minLength(6), this.confirmationValidator])],
      agree: [false, Validators.required]
    }, {
      updateOn: 'blur'
    });
  }

  getErrorMessage() {
    // tslint:disable-next-line
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }
  }
  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.registerForm.controls.checkPassword.updateValueAndValidity());
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }
  register() {
    this.getErrorMessage();
    console.log(this.registerForm.value);
    if (this.registerForm && this.registerForm.valid) {
      this.authservice.registerUser(this.registerForm.value).subscribe(data => {
        if (data) {
          this.toastr.successToaster('Sign up successful');
          this.router.navigate(['/posts']);
        }
      });
    }
  }
}
