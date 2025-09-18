import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesLicensesComponent } from './pages-licenses.component';

describe('PagesLicensesComponent', () => {
  let component: PagesLicensesComponent;
  let fixture: ComponentFixture<PagesLicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesLicensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
