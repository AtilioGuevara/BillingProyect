import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEmailTemplatesNewsletterComponent } from './apps-email-templates-newsletter.component';

describe('AppsEmailTemplatesNewsletterComponent', () => {
  let component: AppsEmailTemplatesNewsletterComponent;
  let fixture: ComponentFixture<AppsEmailTemplatesNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEmailTemplatesNewsletterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEmailTemplatesNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
