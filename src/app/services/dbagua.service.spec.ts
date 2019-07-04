import { TestBed } from '@angular/core/testing';

import { DbaguaService } from './dbagua.service';

describe('DbaguaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbaguaService = TestBed.get(DbaguaService);
    expect(service).toBeTruthy();
  });
});
