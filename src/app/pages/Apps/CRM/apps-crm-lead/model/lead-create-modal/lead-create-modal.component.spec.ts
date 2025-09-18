import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCreateModalComponent } from './lead-create-modal.component';

describe('LeadCreateModalComponent', () => {
  let component: LeadCreateModalComponent;
  let fixture: ComponentFixture<LeadCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
