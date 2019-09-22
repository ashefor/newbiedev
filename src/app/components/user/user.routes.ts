import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { RegisterComponent } from './register/register.component';

export const userRoutes: Routes = [
    {path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent },
    { path: 'reset-password', component: ResetPwdComponent }
]