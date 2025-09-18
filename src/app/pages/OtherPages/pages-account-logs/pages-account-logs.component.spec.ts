import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesAccountLogsComponent } from './pages-account-logs.component';

describe('PagesAccountLogsComponent', () => {
  let component: PagesAccountLogsComponent;
  let fixture: ComponentFixture<PagesAccountLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesAccountLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesAccountLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
