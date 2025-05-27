import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqDetailPage } from './faq-detail.page';

describe('FaqDetailPage', () => {
  let component: FaqDetailPage;
  let fixture: ComponentFixture<FaqDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
