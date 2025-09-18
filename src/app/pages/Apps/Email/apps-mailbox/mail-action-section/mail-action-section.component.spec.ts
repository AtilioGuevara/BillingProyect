import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailActionSectionComponent } from './mail-action-section.component';

describe('MailActionSectionComponent', () => {
  let component: MailActionSectionComponent;
  let fixture: ComponentFixture<MailActionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailActionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailActionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
