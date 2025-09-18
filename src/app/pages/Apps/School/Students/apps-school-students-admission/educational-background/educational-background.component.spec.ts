import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalBackgroundComponent } from './educational-background.component';

describe('EducationalBackgroundComponent', () => {
  let component: EducationalBackgroundComponent;
  let fixture: ComponentFixture<EducationalBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationalBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationalBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
