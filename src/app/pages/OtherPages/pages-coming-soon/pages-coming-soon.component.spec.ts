import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesComingSoonComponent } from './pages-coming-soon.component';

describe('PagesComingSoonComponent', () => {
  let component: PagesComingSoonComponent;
  let fixture: ComponentFixture<PagesComingSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesComingSoonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesComingSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
