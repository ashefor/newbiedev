import { Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';

export const userRoutes: Routes = [
    { path: 'logout', component: LogoutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reset-password', component: ResetPwdComponent }
]