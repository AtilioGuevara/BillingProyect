import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesContactUsThreeComponent } from './pages-contact-us-three.component';

describe('PagesContactUsThreeComponent', () => {
  let component: PagesContactUsThreeComponent;
  let fixture: ComponentFixture<PagesContactUsThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesContactUsThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesContactUsThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
