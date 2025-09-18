import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCalenderWeeknumberComponent } from './apps-calender-weeknumber.component';

describe('AppsCalenderWeeknumberComponent', () => {
  let component: AppsCalenderWeeknumberComponent;
  let fixture: ComponentFixture<AppsCalenderWeeknumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCalenderWeeknumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCalenderWeeknumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
