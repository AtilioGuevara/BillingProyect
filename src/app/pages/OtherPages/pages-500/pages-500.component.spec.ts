import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pages500Component } from './pages-500.component';

describe('Pages500Component', () => {
  let component: Pages500Component;
  let fixture: ComponentFixture<Pages500Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pages500Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pages500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
