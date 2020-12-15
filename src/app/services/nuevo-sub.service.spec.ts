import { TestBed } from '@angular/core/testing';

import { NuevoSubService } from './nuevo-sub.service';

describe('NuevoSubService', () => {
  let service: NuevoSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
