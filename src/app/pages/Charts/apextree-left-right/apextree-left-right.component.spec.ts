import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApextreeLeftRightComponent } from './apextree-left-right.component';

describe('ApextreeLeftRightComponent', () => {
  let component: ApextreeLeftRightComponent;
  let fixture: ComponentFixture<ApextreeLeftRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApextreeLeftRightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApextreeLeftRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
