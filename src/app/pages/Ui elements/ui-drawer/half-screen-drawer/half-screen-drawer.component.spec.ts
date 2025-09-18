import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfScreenDrawerComponent } from './half-screen-drawer.component';

describe('HalfScreenDrawerComponent', () => {
  let component: HalfScreenDrawerComponent;
  let fixture: ComponentFixture<HalfScreenDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HalfScreenDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalfScreenDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
