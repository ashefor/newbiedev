import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [

  
  {
    path: 'posts', loadChildren: ()=> import('./components/post/posts.module').then((m)=>m.PostsModule)
  },
  {
    path: 'auth', loadChildren: ()=> import('./components/user/user.module').then((m)=>m.UserModule)
  },
  { path: ':username', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
