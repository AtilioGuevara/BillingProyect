import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionModalComponent } from './add-question-modal.component';

describe('AddQuestionModalComponent', () => {
  let component: AddQuestionModalComponent;
  let fixture: ComponentFixture<AddQuestionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuestionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
