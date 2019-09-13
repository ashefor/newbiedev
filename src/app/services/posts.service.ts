import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { posts } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAllPosts(){
    return this.http.get<posts[]>(environment.postsURL)
  }

  createPost(post: posts){
    return this.http.post(environment.postsURL, post)
  }

  singlePost(id: number){
    return this.http.get<posts>(`${environment.postsURL}/${id}`)
  }
  updatePost(post: posts){
    return this.http.put(`${environment.postsURL}/${post._id}`, post)
  }
  deletePost(id: number){
    return this.http.delete(`${environment.postsURL}/${id}`)
  }
  likeThisPost(id: number){
    return this.http.put(`${environment.postsURL}/${id}/likes`,{})
  }
  likeThisComment(post_id:number, comment_id: number){
    return this.http.put(`${environment.postsURL}/${post_id}/comments/${comment_id}/likes`,{})
  }
  createComment(id: number, content: string){
    return this.http.post(`${environment.postsURL}/${id}/comments`, {content})
  }
  getSingleCommentForUpdate(post_id: number, comment_id: number){
    return this.http.get(`${environment.postsURL}/${post_id}/comments/${comment_id}`)
  }
  updateThisComment(post_id: number, comment_id: number, content: string){
    return this.http.put(`${environment.postsURL}/${post_id}/comments/${comment_id}`, {content})
  }
  deleteComment(post_id: number, comment_id: number){
    return this.http.delete(`${environment.postsURL}/${post_id}/comments/${comment_id}`)
  }
  postCommentReply(post_id: number, comment_id: number, content: string){
    return this.http.post(`${environment.postsURL}/${post_id}/comments/${comment_id}/replies`, {content})
  }
  getReplyForUpdate(post_id: number, comment_id: number, reply_id: number){
    return this.http.get(`${environment.postsURL}/${post_id}/comments/${comment_id}/replies/${reply_id}`)
  }
  editCommentReply(post_id: number, comment_id: number, reply_id: number, content: string){
    return this.http.put(`${environment.postsURL}/${post_id}/comments/${comment_id}/replies/${reply_id}`, {content})
  }
  deleteCommentReply(post_id: number, comment_id: number, reply_id: number){
    return this.http.delete(`${environment.postsURL}/${post_id}/comments/${comment_id}/replies/${reply_id}`)
  }
}
