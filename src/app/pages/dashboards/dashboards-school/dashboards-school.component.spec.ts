import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsSchoolComponent } from './dashboards-school.component';

describe('DashboardsSchoolComponent', () => {
  let component: DashboardsSchoolComponent;
  let fixture: ComponentFixture<DashboardsSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsSchoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardsSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
