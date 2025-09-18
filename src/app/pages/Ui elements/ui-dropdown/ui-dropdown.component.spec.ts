import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDropdownComponent } from './ui-dropdown.component';

describe('UiDropdownComponent', () => {
  let component: UiDropdownComponent;
  let fixture: ComponentFixture<UiDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
