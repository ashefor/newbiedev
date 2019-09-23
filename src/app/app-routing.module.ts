import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [

  { path: ':username', component: ProfileComponent },
  {
    path: 'posts', loadChildren: './components/post/posts.module#PostsModule'
  },
  {
    path: 'auth', loadChildren: './components/user/user.module#UserModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
