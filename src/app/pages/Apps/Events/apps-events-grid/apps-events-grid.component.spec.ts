import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEventsGridComponent } from './apps-events-grid.component';

describe('AppsEventsGridComponent', () => {
  let component: AppsEventsGridComponent;
  let fixture: ComponentFixture<AppsEventsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEventsGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEventsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
