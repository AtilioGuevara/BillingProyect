import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomixEchartComponent } from './domix-echart.component';

describe('DomixEchartComponent', () => {
  let component: DomixEchartComponent;
  let fixture: ComponentFixture<DomixEchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomixEchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomixEchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
