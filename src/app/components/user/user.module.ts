import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { RouterModule } from '@angular/router';

import { userRoutes } from './user.routes'
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    ResetPwdComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
