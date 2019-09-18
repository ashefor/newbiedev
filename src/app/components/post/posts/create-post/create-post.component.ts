import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MarkdownOptions } from '../../../../models/markdown'
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  selectedtags = [];
  loading: boolean;
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

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(private formbuilder: FormBuilder, private service: PostsService, private route: Router) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
    this.initialiseForm()
  }

  public option: MarkdownOptions = {
    hideIcons: ['Image'],
    enablePreviewContentClick: true,
    showPreviewPanel: false,
  }
  public height: string = "60vh"
  ngOnInit() {
  }

  initialiseForm() {
    this.createPostForm = this.formbuilder.group({
      title: [''],
      content: [''],
      meta: this.formbuilder.group({
        tags: [this.fruits],
        mediaIds: ['']
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
    })
  }
}
