import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesAccountSecurityComponent } from './pages-account-security.component';

describe('PagesAccountSecurityComponent', () => {
  let component: PagesAccountSecurityComponent;
  let fixture: ComponentFixture<PagesAccountSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesAccountSecurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesAccountSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
