import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsCardsComponent } from './widgets-cards.component';

describe('WidgetsCardsComponent', () => {
  let component: WidgetsCardsComponent;
  let fixture: ComponentFixture<WidgetsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetsCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
