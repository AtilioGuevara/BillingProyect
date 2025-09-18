import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsPosSalesReportsComponent } from './apps-pos-sales-reports.component';

describe('AppsPosSalesReportsComponent', () => {
  let component: AppsPosSalesReportsComponent;
  let fixture: ComponentFixture<AppsPosSalesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsPosSalesReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsPosSalesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
