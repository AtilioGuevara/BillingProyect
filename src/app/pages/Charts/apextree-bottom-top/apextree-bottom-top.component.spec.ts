import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApextreeBottomTopComponent } from './apextree-bottom-top.component';

describe('ApextreeBottomTopComponent', () => {
  let component: ApextreeBottomTopComponent;
  let fixture: ComponentFixture<ApextreeBottomTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApextreeBottomTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApextreeBottomTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
