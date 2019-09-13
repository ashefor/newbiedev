import { Routes } from '@angular/router';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';

export const postRoutes: Routes = [
    {path: '', component: AllPostsComponent},
    {path: 'create', component: CreatePostComponent},
    {path: ':id', component: SinglePostComponent}
]