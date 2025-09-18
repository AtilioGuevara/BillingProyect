import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPaginationComponent } from './ui-pagination.component';

describe('UiPaginationComponent', () => {
  let component: UiPaginationComponent;
  let fixture: ComponentFixture<UiPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
