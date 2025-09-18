import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsHeroiconsComponent } from './icons-heroicons.component';

describe('IconsHeroiconsComponent', () => {
  let component: IconsHeroiconsComponent;
  let fixture: ComponentFixture<IconsHeroiconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsHeroiconsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconsHeroiconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
