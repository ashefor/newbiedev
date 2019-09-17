import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { posts, IComments } from 'src/app/models/post.model';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';
import { MarkdownOptions } from 'src/app/models/markdown.model';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  constructor(private router: ActivatedRoute, private service: PostsService, private toastr: ToastrNotificationService, private route: Router) { }

  post: posts;
  showpost:boolean;
  nooflikes;
  hasLiked;
  hasLikedThis;
  hasLikedThis2;
  alltags = [];
  resetForm: boolean;
  public options: MarkdownOptions = {
    enablePreviewContentClick: true,
  }
  public mode: string = 'preview';
  public height: string = "auto";
  
  ngOnInit() {
    this.router.params.subscribe((params: Params)=>{
      this.service.singlePost(params.id).subscribe((data: any)=>{
        if(data){
          this.showpost = true;
          this.post = data;
          this.alltags = data.meta.tags;
          this.nooflikes = data.meta.likes;
        }
      })
    })
  }

  likePost(id) {
    if (!this.hasLiked) {
      this.hasLiked = true;
      this.nooflikes += 1
      this.service.likeThisPost(id).subscribe((data: any) => {
        if(data){
          this.hasLikedThis = `rgba(33,150,243,.4)`;
          this.hasLikedThis2 = `rgba(33,150,243,.1)`;
          this.toastr.successToaster('Liked Successfully')
        }
      })
    }
  }

  deleteThisPost(post: posts) {
    if (confirm(`Really delete ${post.title}?`)) {
      this.service.deletePost(post._id).subscribe((data: any) => {
        if (data) {
          this.toastr.successToaster(data.message)
          this.route.navigate(['/posts'])
        }
        (error: any) => {
          console.log(error)
        }
      })
    }
  }

  saveNewComment(comment: IComments){
    this.service.createComment(this.post._id, comment.content).subscribe((data: any)=>{
      if(data){
        this.resetForm = true
        this.post = data;
      }
    })
  }

}
