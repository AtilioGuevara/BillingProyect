import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsBannersComponent } from './widgets-banners.component';

describe('WidgetsBannersComponent', () => {
  let component: WidgetsBannersComponent;
  let fixture: ComponentFixture<WidgetsBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetsBannersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetsBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
