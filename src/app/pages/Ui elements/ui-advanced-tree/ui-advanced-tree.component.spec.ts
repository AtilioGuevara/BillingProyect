import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdvancedTreeComponent } from './ui-advanced-tree.component';

describe('UiAdvancedTreeComponent', () => {
  let component: UiAdvancedTreeComponent;
  let fixture: ComponentFixture<UiAdvancedTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAdvancedTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiAdvancedTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
