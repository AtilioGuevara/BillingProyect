import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartBarComponent } from './apexchart-bar.component';

describe('ApexchartBarComponent', () => {
  let component: ApexchartBarComponent;
  let fixture: ComponentFixture<ApexchartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
