import { TestBed } from '@angular/core/testing';

import { DbraivaService } from './dbraiva.service';

describe('DbraivaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbraivaService = TestBed.get(DbraivaService);
    expect(service).toBeTruthy();
  });
});
