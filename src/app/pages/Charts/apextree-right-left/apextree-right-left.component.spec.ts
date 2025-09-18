import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApextreeRightLeftComponent } from './apextree-right-left.component';

describe('ApextreeRightLeftComponent', () => {
  let component: ApextreeRightLeftComponent;
  let fixture: ComponentFixture<ApextreeRightLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApextreeRightLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApextreeRightLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
