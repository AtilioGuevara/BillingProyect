import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatAddEditComponent } from './cat-add-edit.component';

describe('CatAddEditComponent', () => {
  let component: CatAddEditComponent;
  let fixture: ComponentFixture<CatAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
