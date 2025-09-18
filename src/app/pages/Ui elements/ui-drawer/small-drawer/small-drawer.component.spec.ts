import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallDrawerComponent } from './small-drawer.component';

describe('SmallDrawerComponent', () => {
  let component: SmallDrawerComponent;
  let fixture: ComponentFixture<SmallDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
