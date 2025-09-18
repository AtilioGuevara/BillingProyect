import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomixGridTestComponent } from './domix-grid-test.component';

describe('DomixGridTestComponent', () => {
  let component: DomixGridTestComponent;
  let fixture: ComponentFixture<DomixGridTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomixGridTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomixGridTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
