import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsAnalyticsComponent } from './dashboards-analytics.component';

describe('DashboardsAnalyticsComponent', () => {
  let component: DashboardsAnalyticsComponent;
  let fixture: ComponentFixture<DashboardsAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardsAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
