import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCommentsComponent } from './comments/all-comments/all-comments.component';
import { EditCommentComponent } from './comments/edit-comment/edit-comment.component';
import { CommentRepliesComponent } from './replies/comment-replies/comment-replies.component';
import { EditCommentReplyComponent } from './replies/edit-comment-reply/edit-comment-reply.component';
import { ReplyCommentReplyComponent } from './replies/reply-comment-reply/reply-comment-reply.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { RouterModule } from '@angular/router';
import { postRoutes } from './posts.route'
import { SharedModule } from '../shared/shared.module';
import { TimeAgoPipe } from 'src/app/pipes/time-ago.pipe';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { CreateCommentComponent } from './comments/create-comment/create-comment.component';



@NgModule({
  declarations: [
    AllCommentsComponent, 
    EditCommentComponent, 
    CommentRepliesComponent, 
    EditCommentReplyComponent, 
    ReplyCommentReplyComponent, 
    AllPostsComponent, 
    SinglePostComponent, 
    CreatePostComponent,
    TimeAgoPipe,
    EditPostComponent,
    CreateCommentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(postRoutes)
  ]
})
export class PostsModule { }
