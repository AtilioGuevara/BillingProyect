import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsCrmComponent } from './dashboards-crm.component';

describe('DashboardsCrmComponent', () => {
  let component: DashboardsCrmComponent;
  let fixture: ComponentFixture<DashboardsCrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsCrmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardsCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
