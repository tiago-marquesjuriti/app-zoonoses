import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeptospirosePage } from './leptospirose.page';

describe('LeptospirosePage', () => {
  let component: LeptospirosePage;
  let fixture: ComponentFixture<LeptospirosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeptospirosePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeptospirosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
