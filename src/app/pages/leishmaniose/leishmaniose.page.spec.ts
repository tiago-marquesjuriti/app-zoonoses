import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeishmaniosePage } from './leishmaniose.page';

describe('LeishmaniosePage', () => {
  let component: LeishmaniosePage;
  let fixture: ComponentFixture<LeishmaniosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeishmaniosePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeishmaniosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
