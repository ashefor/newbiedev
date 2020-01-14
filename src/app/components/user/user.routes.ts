import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { RegisterComponent } from './register/register.component';
import { isLoggedInGuard } from 'src/app/guards/isLoggedIn.guard';

export const userRoutes: Routes = [
    {path: 'register', component: RegisterComponent, canActivate: [isLoggedInGuard] },
    { path: 'login', component: LoginComponent, canActivate: [isLoggedInGuard] },
    { path: 'reset-password', component: ResetPwdComponent }
];
