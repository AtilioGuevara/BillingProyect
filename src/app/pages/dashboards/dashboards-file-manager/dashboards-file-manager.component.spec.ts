import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsFileManagerComponent } from './dashboards-file-manager.component';

describe('DashboardsFileManagerComponent', () => {
  let component: DashboardsFileManagerComponent;
  let fixture: ComponentFixture<DashboardsFileManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsFileManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardsFileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
