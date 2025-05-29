import { TestBed } from '@angular/core/testing';

import { PlanifierService } from './planifier.service';

describe('PlanifierService', () => {
  let service: PlanifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
