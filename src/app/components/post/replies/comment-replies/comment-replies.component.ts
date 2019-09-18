import { Component, OnInit, Input } from '@angular/core';
import { IReplies } from 'src/app/models/post';
import { MarkdownOptions } from 'src/app/models/markdown';
import { PostsService } from 'src/app/services/posts.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.scss']
})
export class CommentRepliesComponent implements OnInit {
  @Input() replies: IReplies[];
  @Input() commentId;
  @Input() postId;
  @Input() commentIndex;
  public options: MarkdownOptions = {
    enablePreviewContentClick: true,
  }
  public mode: string = 'preview';
  public height: string = "auto"
  newCommentId: any;
  editReplyId: string;
  replyContent: string;
  constructor(private service: PostsService, private toastr: ToastrNotificationService, private authservice: AuthService) { }

  ngOnInit() {
  }

  get isLoggedIn(){
    return this.authservice.isLoggedIn
  }
  showEditThisReply(reply_id) {
    this.service.getReplyForUpdate(this.postId, this.commentId, reply_id).subscribe((data: any) => {
      this.editReplyId = data.reply._id;
      this.replyContent = data.reply.content;
    })
  }
  cancelEditThisReply() {
    this.editReplyId = null;
  }

  editThisReply(reply: IReplies) {
    this.service.editCommentReply(this.postId, this.commentId, this.editReplyId, reply.content).subscribe((data: any) => {
      if (data) {
        this.replies = data.comments[this.commentIndex].replies;
      }
    })
  }
  deleteThisReply(reply_id) {
    if (confirm('really delete this reply?')) {
      this.service.deleteCommentReply(this.postId, this.commentId, reply_id).subscribe((resp: any) => {
        this.replies = resp.comments[this.commentIndex].replies;
        this.toastr.successToaster('Reply deleted successfully')
      })
    }
  }
}
