import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { MarkdownOptions } from 'src/app/models/markdown';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  public option: MarkdownOptions = {
    hideIcons: ['Image'],
    enablePreviewContentClick: true,
    showPreviewPanel: false,
  }
  public height: string = "60vh"
  public mode: string = 'editor'
  constructor(private route: ActivatedRoute, private formbuilder: FormBuilder, private router: Router,
    private service: PostsService) { }
  editpost = {}
  updateform: FormGroup;
  postId;
  ngOnInit() {
    this.initialiseForm()

    this.route.params.subscribe((params: Params) => {
      console.log(params)
      this.postId = params.id
      this.service.singlePost(params.id).subscribe((data: any) => {
        console.log(data)
        this.editpost = data
        // console.log(data.body)
        this.updateform.patchValue(data)
      })
    })
  }

  initialiseForm() {
    this.updateform = this.formbuilder.group({
      _id: [],
      title: [''],
      content: [''],
    })
  }
  updateFrm() {
    const body = this.updateform.value.body;
    const author = this.updateform.value.author;
    const title = this.updateform.value.title
    const update = new Date()
    this.service.updatePost(this.updateform.value).subscribe((data: any) => {
      //  console.log(data)
      if (data) {
        this.router.navigate([`/posts/${this.postId}`])
      }
    })
  }
}
