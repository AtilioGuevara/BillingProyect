import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTabsComponent } from './ui-tabs.component';

describe('UiTabsComponent', () => {
  let component: UiTabsComponent;
  let fixture: ComponentFixture<UiTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
