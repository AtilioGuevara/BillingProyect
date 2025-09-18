import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactOverviewModalComponent } from './contact-overview-modal.component';

describe('ContactOverviewModalComponent', () => {
  let component: ContactOverviewModalComponent;
  let fixture: ComponentFixture<ContactOverviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactOverviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactOverviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
