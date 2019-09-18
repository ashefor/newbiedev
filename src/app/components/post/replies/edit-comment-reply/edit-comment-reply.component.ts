import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IReplies } from 'src/app/models/post';
import { MarkdownOptions } from 'src/app/models/markdown';

@Component({
  selector: 'app-edit-comment-reply',
  templateUrl: './edit-comment-reply.component.html',
  styleUrls: ['./edit-comment-reply.component.scss']
})
export class EditCommentReplyComponent implements OnInit {
  editReplyForm: FormGroup;
  @Input() replyContent;
  @Output() editThisReply = new EventEmitter()
  @Output() cancelEditThisReply = new EventEmitter();
  public option: MarkdownOptions = {
    hideIcons: ['Image'],
    enablePreviewContentClick: true,
    showPreviewPanel: false,
  }
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.initialiseForm()
  }
  initialiseForm(){
    this.editReplyForm = this.formbuilder.group({
      content: [this.replyContent]
    })
  }
  cancel(){
    this.cancelEditThisReply.emit()
  }
  submitEditedReply(formvalue){
    let reply: IReplies = {
      content: formvalue.content
    }
    this.editThisReply.emit(reply)
  }
}
