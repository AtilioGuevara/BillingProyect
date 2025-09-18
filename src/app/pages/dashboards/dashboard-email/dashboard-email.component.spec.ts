import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmailComponent } from './dashboard-email.component';

describe('DashboardEmailComponent', () => {
  let component: DashboardEmailComponent;
  let fixture: ComponentFixture<DashboardEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
