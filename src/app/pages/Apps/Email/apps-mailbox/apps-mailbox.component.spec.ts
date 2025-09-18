import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsMailboxComponent } from './apps-mailbox.component';

describe('AppsMailboxComponent', () => {
  let component: AppsMailboxComponent;
  let fixture: ComponentFixture<AppsMailboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsMailboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
