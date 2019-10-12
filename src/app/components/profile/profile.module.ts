import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { profileRoutes } from './profile.routes';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(profileRoutes)
  ]
})
export class ProfileModule { }
