import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomixPaginationComponent } from './domix-pagination.component';

describe('DomixPaginationComponent', () => {
  let component: DomixPaginationComponent;
  let fixture: ComponentFixture<DomixPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomixPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomixPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
