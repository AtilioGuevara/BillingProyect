import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeDrawerComponent } from './large-drawer.component';

describe('LargeDrawerComponent', () => {
  let component: LargeDrawerComponent;
  let fixture: ComponentFixture<LargeDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargeDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargeDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
