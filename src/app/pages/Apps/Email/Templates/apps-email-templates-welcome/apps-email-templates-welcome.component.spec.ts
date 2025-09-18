import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEmailTemplatesWelcomeComponent } from './apps-email-templates-welcome.component';

describe('AppsEmailTemplatesWelcomeComponent', () => {
  let component: AppsEmailTemplatesWelcomeComponent;
  let fixture: ComponentFixture<AppsEmailTemplatesWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEmailTemplatesWelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEmailTemplatesWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
