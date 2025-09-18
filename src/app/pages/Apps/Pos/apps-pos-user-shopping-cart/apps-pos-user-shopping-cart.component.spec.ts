import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsPosUserShoppingCartComponent } from './apps-pos-user-shopping-cart.component';

describe('AppsPosUserShoppingCartComponent', () => {
  let component: AppsPosUserShoppingCartComponent;
  let fixture: ComponentFixture<AppsPosUserShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsPosUserShoppingCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsPosUserShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
