import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPosUserInterfaceComponent } from './dashboard-pos-user-interface.component';

describe('DashboardPosUserInterfaceComponent', () => {
  let component: DashboardPosUserInterfaceComponent;
  let fixture: ComponentFixture<DashboardPosUserInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPosUserInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPosUserInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
