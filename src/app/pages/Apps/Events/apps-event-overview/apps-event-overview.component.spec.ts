import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEventOverviewComponent } from './apps-event-overview.component';

describe('AppsEventOverviewComponent', () => {
  let component: AppsEventOverviewComponent;
  let fixture: ComponentFixture<AppsEventOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEventOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEventOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
