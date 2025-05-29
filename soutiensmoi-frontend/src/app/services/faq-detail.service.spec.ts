import { TestBed } from '@angular/core/testing';

import { FaqDetailService } from './faq-detail.service';

describe('FaqDetailService', () => {
  let service: FaqDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
