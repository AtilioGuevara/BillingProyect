import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesAccountStatementsComponent } from './pages-account-statements.component';

describe('PagesAccountStatementsComponent', () => {
  let component: PagesAccountStatementsComponent;
  let fixture: ComponentFixture<PagesAccountStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesAccountStatementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesAccountStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
