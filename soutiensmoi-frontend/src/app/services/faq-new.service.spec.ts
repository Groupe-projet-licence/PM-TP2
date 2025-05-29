import { TestBed } from '@angular/core/testing';

import { FaqNewService } from './faq-new.service';

describe('FaqNewService', () => {
  let service: FaqNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
