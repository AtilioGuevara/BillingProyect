import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewModalComponent } from './overview-modal.component';

describe('OverviewModalComponent', () => {
  let component: OverviewModalComponent;
  let fixture: ComponentFixture<OverviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
