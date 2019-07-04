import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaivaPage } from './raiva.page';

describe('RaivaPage', () => {
  let component: RaivaPage;
  let fixture: ComponentFixture<RaivaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaivaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaivaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
