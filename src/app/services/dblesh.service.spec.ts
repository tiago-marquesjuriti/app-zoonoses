import { TestBed } from '@angular/core/testing';

import { DbleshService } from './dblesh.service';

describe('DbleshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbleshService = TestBed.get(DbleshService);
    expect(service).toBeTruthy();
  });
});
