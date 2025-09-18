import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsLineAwesomeComponent } from './icons-line-awesome.component';

describe('IconsLineAwesomeComponent', () => {
  let component: IconsLineAwesomeComponent;
  let fixture: ComponentFixture<IconsLineAwesomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsLineAwesomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconsLineAwesomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
