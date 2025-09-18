import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingEcommerceComponent } from './landing-ecommerce.component';

describe('LandingEcommerceComponent', () => {
  let component: LandingEcommerceComponent;
  let fixture: ComponentFixture<LandingEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingEcommerceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
