import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsCreateModalComponent } from './parents-create-modal.component';

describe('ParentsCreateModalComponent', () => {
  let component: ParentsCreateModalComponent;
  let fixture: ComponentFixture<ParentsCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentsCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentsCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
