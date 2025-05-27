import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanifierPage } from './planifier.page';

describe('PlanifierPage', () => {
  let component: PlanifierPage;
  let fixture: ComponentFixture<PlanifierPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanifierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
