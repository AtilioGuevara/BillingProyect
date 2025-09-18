import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsPosCustomerDatabaseComponent } from './apps-pos-customer-database.component';

describe('AppsPosCustomerDatabaseComponent', () => {
  let component: AppsPosCustomerDatabaseComponent;
  let fixture: ComponentFixture<AppsPosCustomerDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsPosCustomerDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsPosCustomerDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
