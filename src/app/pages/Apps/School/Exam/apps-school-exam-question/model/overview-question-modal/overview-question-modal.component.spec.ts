import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewQuestionModalComponent } from './overview-question-modal.component';

describe('OverviewQuestionModalComponent', () => {
  let component: OverviewQuestionModalComponent;
  let fixture: ComponentFixture<OverviewQuestionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewQuestionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
