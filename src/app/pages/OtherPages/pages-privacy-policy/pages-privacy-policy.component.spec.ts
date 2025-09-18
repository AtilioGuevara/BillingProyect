import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesPrivacyPolicyComponent } from './pages-privacy-policy.component';

describe('PagesPrivacyPolicyComponent', () => {
  let component: PagesPrivacyPolicyComponent;
  let fixture: ComponentFixture<PagesPrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesPrivacyPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
