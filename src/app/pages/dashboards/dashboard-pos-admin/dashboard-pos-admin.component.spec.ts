import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPosAdminComponent } from './dashboard-pos-admin.component';

describe('DashboardPosAdminComponent', () => {
  let component: DashboardPosAdminComponent;
  let fixture: ComponentFixture<DashboardPosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
