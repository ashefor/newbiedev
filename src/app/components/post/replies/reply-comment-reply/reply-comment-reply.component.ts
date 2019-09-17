import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarkdownOptions } from 'src/app/models/markdown.model';
import { IReplies } from 'src/app/models/post.model';

@Component({
  selector: 'app-reply-comment-reply',
  templateUrl: './reply-comment-reply.component.html',
  styleUrls: ['./reply-comment-reply.component.scss']
})
export class ReplyCommentReplyComponent implements OnInit {
  replyCommentForm: FormGroup;
  @Output() replyComment = new EventEmitter();
  @Output() cancelAddReply = new EventEmitter()
  public option: MarkdownOptions = {
    hideIcons: ['Image'],
    enablePreviewContentClick: true,
    showPreviewPanel: false,
  }
  constructor(private formbuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.initialiseForm()
  }

  initialiseForm(){
    this.replyCommentForm = this.formbuilder.group({
      content: ['', Validators.required]
    })
  }

  cancelReply() {
    this.cancelAddReply.emit()
  }
  sendReply(formValue) {
    let reply: IReplies = {
      content: formValue.content,
      date: new Date,
    }
    this.replyComment.emit(reply)
  }
}
