import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentReplyComponent } from './edit-comment-reply.component';

describe('EditCommentReplyComponent', () => {
  let component: EditCommentReplyComponent;
  let fixture: ComponentFixture<EditCommentReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommentReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommentReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
