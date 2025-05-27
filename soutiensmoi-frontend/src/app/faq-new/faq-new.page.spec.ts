import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqNewPage } from './faq-new.page';

describe('FaqNewPage', () => {
  let component: FaqNewPage;
  let fixture: ComponentFixture<FaqNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
