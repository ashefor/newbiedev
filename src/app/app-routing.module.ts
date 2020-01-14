import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [


  {
    path: 'posts', loadChildren: () => import('./components/post/posts.module').then((m) => m.PostsModule)
  },
  {
    path: 'auth', loadChildren: () => import('./components/user/user.module').then((m) => m.UserModule)
  },
  { path: ':username', loadChildren: () => import('./components/profile/profile.module').then((m) => m.ProfileModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
