import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbacktutorPage } from './feedbacktutor.page';

describe('FeedbacktutorPage', () => {
  let component: FeedbacktutorPage;
  let fixture: ComponentFixture<FeedbacktutorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacktutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
