import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pages404Component } from './pages-404.component';

describe('Pages404Component', () => {
  let component: Pages404Component;
  let fixture: ComponentFixture<Pages404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pages404Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pages404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
