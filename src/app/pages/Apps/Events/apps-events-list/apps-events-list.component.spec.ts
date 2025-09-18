import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEventsListComponent } from './apps-events-list.component';

describe('AppsEventsListComponent', () => {
  let component: AppsEventsListComponent;
  let fixture: ComponentFixture<AppsEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEventsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
