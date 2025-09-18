import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsLucideComponent } from './icons-lucide.component';

describe('IconsLucideComponent', () => {
  let component: IconsLucideComponent;
  let fixture: ComponentFixture<IconsLucideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsLucideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconsLucideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
