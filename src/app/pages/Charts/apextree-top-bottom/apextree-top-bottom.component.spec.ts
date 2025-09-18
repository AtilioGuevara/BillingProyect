import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApextreeTopBottomComponent } from './apextree-top-bottom.component';

describe('ApextreeTopBottomComponent', () => {
  let component: ApextreeTopBottomComponent;
  let fixture: ComponentFixture<ApextreeTopBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApextreeTopBottomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApextreeTopBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
