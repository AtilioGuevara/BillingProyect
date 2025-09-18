import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCreateModalComponent } from './contact-create-modal.component';

describe('ContactCreateModalComponent', () => {
  let component: ContactCreateModalComponent;
  let fixture: ComponentFixture<ContactCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
