import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCrmLeadComponent } from './apps-crm-lead.component';

describe('AppsCrmLeadComponent', () => {
  let component: AppsCrmLeadComponent;
  let fixture: ComponentFixture<AppsCrmLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCrmLeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCrmLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
