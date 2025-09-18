import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCalenderListviewComponent } from './apps-calender-listview.component';

describe('AppsCalenderListviewComponent', () => {
  let component: AppsCalenderListviewComponent;
  let fixture: ComponentFixture<AppsCalenderListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCalenderListviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCalenderListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
