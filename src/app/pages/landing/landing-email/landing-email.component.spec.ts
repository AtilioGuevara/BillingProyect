import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingEmailComponent } from './landing-email.component';

describe('LandingEmailComponent', () => {
  let component: LandingEmailComponent;
  let fixture: ComponentFixture<LandingEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
