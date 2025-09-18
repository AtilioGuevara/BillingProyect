import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesHelpCenterComponent } from './pages-help-center.component';

describe('PagesHelpCenterComponent', () => {
  let component: PagesHelpCenterComponent;
  let fixture: ComponentFixture<PagesHelpCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesHelpCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
