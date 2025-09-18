import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsProjectsComponent } from './dashboards-projects.component';

describe('DashboardsProjectsComponent', () => {
  let component: DashboardsProjectsComponent;
  let fixture: ComponentFixture<DashboardsProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
