import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCalenderDefaultComponent } from './apps-calender-default.component';

describe('AppsCalenderDefaultComponent', () => {
  let component: AppsCalenderDefaultComponent;
  let fixture: ComponentFixture<AppsCalenderDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCalenderDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCalenderDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
