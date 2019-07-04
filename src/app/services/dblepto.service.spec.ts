import { TestBed } from '@angular/core/testing';

import { DbleptoService } from './dblepto.service';

describe('DbleptoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbleptoService = TestBed.get(DbleptoService);
    expect(service).toBeTruthy();
  });
});
