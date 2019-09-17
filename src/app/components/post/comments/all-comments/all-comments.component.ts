import { Component, OnInit, Input } from '@angular/core';
import { IComments, IReplies } from 'src/app/models/post.model';
import { MarkdownOptions } from 'src/app/models/markdown.model';
import { PostsService } from 'src/app/services/posts.service';
import { DataService } from 'src/app/services/data.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss']
})
export class AllCommentsComponent implements OnInit {
  @Input() comments: IComments[]
  @Input() postId;
  public options: MarkdownOptions = {
    enablePreviewContentClick: true,
  }
  public mode: string = 'preview';
  public height: string = "auto"
  newCommentId: any;
  editCommentId: any;
  commentToEdit: string;
  constructor(private service: PostsService, private dataservice: DataService, private toastr: ToastrNotificationService) { }

  ngOnInit() {
  }


  showEditComment(comment_id) {
    this.service.getSingleCommentForUpdate(this.postId, comment_id).subscribe((data: any) => {
      if (data) {
        this.editCommentId = comment_id;
        this.commentToEdit = data.content;
      }
    })
  }
  editComment(editedcomment: IComments) {
    this.service.updateThisComment(this.postId, this.editCommentId, editedcomment.content).subscribe((data: any) => {
      if (data) {
        this.comments = data.comments;
        this.cancelEditComment()
      }
    })
  }
  showReplyComment(comment_id) {
    this.newCommentId = this.comments.find(x => x.id = comment_id).id
  }
  replyComment(reply: IReplies) {
    this.service.postCommentReply(this.postId, this.newCommentId, reply.content).subscribe((data: any) => {
      if (data) {
        this.comments = data.comments
        this.cancelAddReply()
      }
    })
  }
  cancelAddReply() {
    this.newCommentId = null;
  }
  cancelEditComment() {
    this.editCommentId = null;
  }
  deleteThisComment(comment_id) {
    if (confirm('really delete this comment?')) {
      this.service.deleteComment(this.postId, comment_id).subscribe((resp: any) => {
        this.comments = resp.comments
        this.toastr.successToaster('Comment deleted successfully')
      })
    }
  }
}
