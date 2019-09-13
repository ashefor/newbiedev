import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MarkdownOptions } from 'src/app/models/markdown.model';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {
  commentForm: FormGroup
  constructor(private formbuilder: FormBuilder) {
    this.initialiseForm()
   }

  public option: MarkdownOptions = {
    hideIcons: ['Image'],
    enablePreviewContentClick: true,
    showPreviewPanel: false,
  }
  ngOnInit() {
  }

  initialiseForm(){
    this.commentForm = this.formbuilder.group({
      content: ['']
    })
  }
}
