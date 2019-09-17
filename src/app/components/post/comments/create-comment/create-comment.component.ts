import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MarkdownOptions } from 'src/app/models/markdown.model';
import { IComments } from 'src/app/models/post.model';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit, OnChanges{
  commentForm: FormGroup;
  @Input() isReset: boolean = false;
  @Output() saveNewComment = new EventEmitter();
  

  constructor(private formbuilder: FormBuilder) {
  }

  public option: MarkdownOptions = {
    hideIcons: ['Image'],
    enablePreviewContentClick: true,
    showPreviewPanel: false,
  }
  ngOnInit() {
    this.initialiseForm()
  }
  ngOnChanges() {
    if (this.isReset) {
      this.commentForm.reset()
    }
  }
  initialiseForm() {
    this.commentForm = this.formbuilder.group({
      content: ['', Validators.required]
    })
  }

  addThisComment(formValue) {
    let comment: IComments = {
      content: formValue.content,
      likes: 0,
      date: new Date,
    }
    this.saveNewComment.emit(comment)
  }
}
