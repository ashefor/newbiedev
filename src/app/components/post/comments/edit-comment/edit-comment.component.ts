import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MarkdownOptions } from 'src/app/models/markdown';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IComments } from 'src/app/models/post';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  public option: MarkdownOptions = {
    hideIcons: ['Image'],
    enablePreviewContentClick: true,
    showPreviewPanel: false,
  }
  editCommentForm: FormGroup;
  @Input() commentToEdit;
  @Output() editComment = new EventEmitter();
  @Output() cancelEditComment = new EventEmitter()
  constructor(private formbuilder: FormBuilder) {
   
   }

  ngOnInit() {
    this.initialiseForm()
  }
  initialiseForm(){
    this.editCommentForm = this.formbuilder.group({
      content: [this.commentToEdit]
    })
  }
  cancelCommentEdit(){
    this.cancelEditComment.emit()
  }

  updateComment(formValue){
    let comment: IComments = {
      content: formValue.content
    }
    this.editComment.emit(comment)
  }
}
