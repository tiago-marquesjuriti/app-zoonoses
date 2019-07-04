import { TestBed } from '@angular/core/testing';

import { DbinsetoService } from './dbinseto.service';

describe('DbinsetoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbinsetoService = TestBed.get(DbinsetoService);
    expect(service).toBeTruthy();
  });
});
