import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCrmDealComponent } from './apps-crm-deal.component';

describe('AppsCrmDealComponent', () => {
  let component: AppsCrmDealComponent;
  let fixture: ComponentFixture<AppsCrmDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCrmDealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCrmDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
