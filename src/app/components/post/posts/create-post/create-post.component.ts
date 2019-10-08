import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MarkdownOptions } from '../../../../models/markdown'
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { PostsService } from 'src/app/services/posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  selectedtags = [];
  percentdone;
  imgMarkdownURL: string;
  result: boolean;
  imgDirectURL: string;
  loading: boolean;
  uploading: boolean;
  selectedFile: File
  alltags: string[] = [
    'general',
    'frontend',
    'backend',
    'javascript',
    'framework',
    'typescript',
    'design',
    'vue',
    'react',
    'angular'
  ];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['general',
    'frontend',
    'backend',
    'javascript',
    'framework',
    'typescript',
    'design',
    'vue',
    'react',
    'angular'];
    currentUser;
  @ViewChild('openmodal', { static: false }) openModal: ElementRef<HTMLElement>
  @ViewChild('upload', { static: false }) myInput: ElementRef<HTMLInputElement>
  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  constructor(private router: ActivatedRoute,  
    private title: Title, 
    private formbuilder: FormBuilder, 
    private service: PostsService, 
    private route: Router,
    private authservice: AuthService) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
    
    this.title.setTitle(this.router.snapshot.data['pageTitle'])
    this.authservice.currentUser.subscribe((data: any) => {
      if(data){
        this.currentUser = data.user
      }
    })
  }

  public option: MarkdownOptions = {
    hideIcons: ['Image'],
    enablePreviewContentClick: true,
    showPreviewPanel: false,
  }
  public height: string = "60vh"
  ngOnInit() {
    this.initialiseForm()
    // this.title.setTitle('Create Post')
  }

  initialiseForm() {
    this.createPostForm = this.formbuilder.group({
      title: [''],
      content: [''],
      meta: this.formbuilder.group({
        tags: [this.fruits],
        mediaIds: [''],
        authorId: [this.currentUser.id? this.currentUser.id: null]
      })
    })
  }
  addtag(event) {
    const { target } = event;
    const id: any = (target as HTMLInputElement).getAttribute('data-value');
    if ((target as HTMLInputElement).checked) {
      this.selectedtags.push(id)
      this.createPostForm.patchValue(this.selectedtags.values)
    } else {
      const index = this.selectedtags.indexOf(id);
      if (index > -1) {
        this.selectedtags.splice(index, 1);
      }
    }
  }


  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  selectFile(event) {
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile)
    const imageData = new FormData()
    imageData.append('image', this.selectedFile)
    this.myInput.nativeElement.classList.add('progress-bar', 'progress-bar-striped', 'progress-bar-animated')
    this.uploading = true;
    this.service.uploadImages(imageData).subscribe((event: HttpEvent<any>) => {
      // console.log(event)

      if (event.type === HttpEventType.UploadProgress) {
        this.percentdone =  Math.round(100 * event.loaded / event.total);
        const percentDone = Math.round(100 * event.loaded / event.total);
        // console.log(percentDone)

      }
      if (event.type === HttpEventType.Response) {
        // console.log(event.body)
        this.result = true;
        this.imgMarkdownURL = `![Image Alt Text](${event.body.url})`
      }
    },((error: any)=>{
      this.uploading = false;
    }))
  }
  openThisModal() {
    this.openModal.nativeElement.classList.add('open')
  }
  closeModal() {
    this.openModal.nativeElement.classList.remove('open')
  }
  resetFile() {
    // this.myInput.nativeElement.value = ''
    this.result = false;
    this.uploading = false;
    this.imgMarkdownURL = ''
  }
  onSubmit() {
    this.loading = true;
    if (this.createPostForm.invalid) {
      this.loading = false;
      return
    }
    console.log(this.createPostForm.value)
    this.service.createPost(this.createPostForm.value).subscribe((data: any) => {
      if (data) {
        this.route.navigate(['/posts'])
        this.loading = false
      }
    },(error:any)=>{
      this.loading = false
    })
  }
}
