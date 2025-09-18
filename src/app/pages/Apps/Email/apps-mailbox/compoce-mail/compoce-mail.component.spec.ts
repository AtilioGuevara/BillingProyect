import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoceMailComponent } from './compoce-mail.component';

describe('CompoceMailComponent', () => {
  let component: CompoceMailComponent;
  let fixture: ComponentFixture<CompoceMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoceMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoceMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
