import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomixChartsComponent } from './domix-charts.component';

describe('DomixChartsComponent', () => {
  let component: DomixChartsComponent;
  let fixture: ComponentFixture<DomixChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomixChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomixChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
