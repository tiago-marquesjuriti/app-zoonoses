import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenguePage } from './dengue.page';

describe('DenguePage', () => {
  let component: DenguePage;
  let fixture: ComponentFixture<DenguePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenguePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
