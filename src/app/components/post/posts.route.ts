import { Routes } from '@angular/router';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const postRoutes: Routes = [
    { path: '', component: AllPostsComponent },
    { path: 'create', component: CreatePostComponent, canActivate: [AuthGuard] },
    { path: ':id', component: SinglePostComponent },
    { path: ':id/edit', component: EditPostComponent }
]