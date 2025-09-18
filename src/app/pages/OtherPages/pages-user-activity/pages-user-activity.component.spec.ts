import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesUserActivityComponent } from './pages-user-activity.component';

describe('PagesUserActivityComponent', () => {
  let component: PagesUserActivityComponent;
  let fixture: ComponentFixture<PagesUserActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesUserActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesUserActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
