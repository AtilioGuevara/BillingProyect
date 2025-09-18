/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchMailComponent } from './search-mail.component';

describe('SearchMailComponent', () => {
  let component: SearchMailComponent;
  let fixture: ComponentFixture<SearchMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
