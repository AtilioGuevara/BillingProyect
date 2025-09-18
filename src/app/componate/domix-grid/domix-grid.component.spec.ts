import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomixGridComponent } from './domix-grid.component';

describe('DomixGridComponent', () => {
  let component: DomixGridComponent;
  let fixture: ComponentFixture<DomixGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomixGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomixGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
