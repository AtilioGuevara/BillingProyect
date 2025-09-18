import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsApexsankeyComponent } from './charts-apexsankey.component';

describe('ChartsApexsankeyComponent', () => {
  let component: ChartsApexsankeyComponent;
  let fixture: ComponentFixture<ChartsApexsankeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsApexsankeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsApexsankeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
