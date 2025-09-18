import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsChartsComponent } from './widgets-charts.component';

describe('WidgetsChartsComponent', () => {
  let component: WidgetsChartsComponent;
  let fixture: ComponentFixture<WidgetsChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetsChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
