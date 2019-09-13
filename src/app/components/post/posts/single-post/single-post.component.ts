import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { posts } from 'src/app/models/post.model';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post: posts;
  showpost;
  nooflikes;
  hasLiked;
  hasLikedThis;
  hasLikedThis2;
  alltags = []
  constructor(private router: ActivatedRoute, private service: PostsService) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params)=>{
      this.service.singlePost(params.id).subscribe((data: any)=>{
        if(data){
          this.showpost = true;
          this.post = data;
          this.alltags = data.meta.tags;
          this.nooflikes = data.meta.likes;
          console.log(this.post)
        }
      })
    })
  }

  likePost(id) {
    if (!this.hasLiked) {
      this.hasLiked = true;
      this.hasLikedThis = `rgba(33,150,243,.4)`;
      this.hasLikedThis2 = `rgba(33,150,243,.1)`;
      this.nooflikes += 1
      this.service.likeThisPost(id).subscribe((data: any) => {
        alert('liked successfully')
      })
    }
  }
}
