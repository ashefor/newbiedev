import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { posts, IComments } from 'src/app/models/post';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';
import { MarkdownOptions } from 'src/app/models/markdown';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

declare var swal: any;

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post: posts;
  showpost: boolean;
  nooflikes;
  hasLiked;
  hasLikedThis;
  hasLikedThis2;
  alltags = [];
  currentUser;
  resetForm: boolean;
  result;
  public options: MarkdownOptions = {
    enablePreviewContentClick: true,
  };
  public mode = 'preview';
  public height = 'auto';

  constructor(private router: ActivatedRoute,
              private service: PostsService, private toastr: ToastrNotificationService, private route: Router,
              private authservice: AuthService) {
    this.authservice.currentUser.subscribe((data: any) => this.currentUser = data ? data.user : null);
    // console.log(this.currentUser);
   }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.service.singlePost(params.id).subscribe((data: any) => {
        if (data) {
          this.showpost = true;
          this.post = data;
          console.log(this.post);
          this.alltags = data.meta.tags;
          this.nooflikes = data.meta.likes;
          this.readingTime(data.content);
        }
      });
    });
  }

  readingTime(body) {
    const wordsPerMinute = 200;
    const noOfWords = body.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    this.result = Math.ceil(minutes);
  }

  get authorAccess() {
    const postAuthorId = this.post.author.id;
    if (this.currentUser) {
      if (postAuthorId === this.currentUser.id) {
        return true;
      }
    }
    return false;
  }

  likePost(id) {
    if (!this.hasLiked) {
      this.hasLiked = true;
      this.nooflikes += 1;
      this.service.likeThisPost(id).subscribe((data: any) => {
        if (data) {
          this.hasLikedThis = `rgba(33,150,243,.4)`;
          this.hasLikedThis2 = `rgba(33,150,243,.1)`;
          this.toastr.successToaster('Liked Successfully');
        }
      });
    }
  }

  deleteThisPost(post: posts) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.service.deletePost(post._id).subscribe((data: any) => {
          if (data) {
            this.toastr.successToaster(data.message);
            this.route.navigate(['/posts']);
          }
          (error: any) => {
            console.log(error);
          };
        });
      } else {
        swal('Good choice!');
      }
    });
  }

  saveNewComment(comment: IComments) {
    this.service.createComment(this.post._id, comment.content).subscribe((data: any) => {
      if (data) {
        this.resetForm = true;
        this.post = data;
      }
    });
  }

}
