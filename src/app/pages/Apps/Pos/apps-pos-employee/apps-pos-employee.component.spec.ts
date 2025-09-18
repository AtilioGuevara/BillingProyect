import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsPosEmployeeComponent } from './apps-pos-employee.component';

describe('AppsPosEmployeeComponent', () => {
  let component: AppsPosEmployeeComponent;
  let fixture: ComponentFixture<AppsPosEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsPosEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsPosEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
