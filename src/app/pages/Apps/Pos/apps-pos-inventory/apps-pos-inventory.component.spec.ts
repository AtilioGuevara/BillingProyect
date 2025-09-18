import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsPosInventoryComponent } from './apps-pos-inventory.component';

describe('AppsPosInventoryComponent', () => {
  let component: AppsPosInventoryComponent;
  let fixture: ComponentFixture<AppsPosInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsPosInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsPosInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
