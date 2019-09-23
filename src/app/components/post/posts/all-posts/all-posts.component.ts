import { Component, OnInit } from '@angular/core';
import { posts } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { User } from 'src/app/components/user/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
  currentUser: User;
  posts: posts[];
  alltags = [];
  result = [];
  constructor(private service: PostsService, private authservice: AuthService) { 
    this.currentUser = this.authservice.currentUserValue;
  }

  ngOnInit() {
    this.getAllPosts()
  }
  getAllPosts(){
    this.service.getAllPosts().subscribe((data:any)=>{
      if(data){
        this.posts = data;
        for (let obj of data) {
          this.readingTime(obj.content)
          this.alltags.push(obj.meta.tags);
        }
      }
    })
  }

  readingTime(body) {
    const wordsPerMinute = 200;
    const noOfWords = body.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    this.result.push(Math.ceil(minutes));
  }
}
