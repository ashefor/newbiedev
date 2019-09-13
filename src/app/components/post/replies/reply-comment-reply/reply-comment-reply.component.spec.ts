import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyCommentReplyComponent } from './reply-comment-reply.component';

describe('ReplyCommentReplyComponent', () => {
  let component: ReplyCommentReplyComponent;
  let fixture: ComponentFixture<ReplyCommentReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyCommentReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyCommentReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
