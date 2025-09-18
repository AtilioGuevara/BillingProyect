import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsPosPromotionsMarketingComponent } from './apps-pos-promotions-marketing.component';

describe('AppsPosPromotionsMarketingComponent', () => {
  let component: AppsPosPromotionsMarketingComponent;
  let fixture: ComponentFixture<AppsPosPromotionsMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsPosPromotionsMarketingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsPosPromotionsMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
