import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCrmContactComponent } from './apps-crm-contact.component';

describe('AppsCrmContactComponent', () => {
  let component: AppsCrmContactComponent;
  let fixture: ComponentFixture<AppsCrmContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCrmContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCrmContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
