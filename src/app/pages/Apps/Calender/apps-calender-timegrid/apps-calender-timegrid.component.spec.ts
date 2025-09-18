import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCalenderTimegridComponent } from './apps-calender-timegrid.component';

describe('AppsCalenderTimegridComponent', () => {
  let component: AppsCalenderTimegridComponent;
  let fixture: ComponentFixture<AppsCalenderTimegridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCalenderTimegridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCalenderTimegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
