import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCalenderLocalizeComponent } from './apps-calender-localize.component';

describe('AppsCalenderLocalizeComponent', () => {
  let component: AppsCalenderLocalizeComponent;
  let fixture: ComponentFixture<AppsCalenderLocalizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCalenderLocalizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCalenderLocalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
