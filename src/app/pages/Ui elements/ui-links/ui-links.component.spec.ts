import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLinksComponent } from './ui-links.component';

describe('UiLinksComponent', () => {
  let component: UiLinksComponent;
  let fixture: ComponentFixture<UiLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
