import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAddEditModelComponent } from './open-add-edit-model.component';

describe('OpenAddEditModelComponent', () => {
  let component: OpenAddEditModelComponent;
  let fixture: ComponentFixture<OpenAddEditModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenAddEditModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenAddEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
