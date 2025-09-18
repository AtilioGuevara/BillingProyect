import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIndoxComponent } from './main-indox.component';

describe('MainIndoxComponent', () => {
  let component: MainIndoxComponent;
  let fixture: ComponentFixture<MainIndoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainIndoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainIndoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
