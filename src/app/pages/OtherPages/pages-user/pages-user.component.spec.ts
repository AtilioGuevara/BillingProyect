import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesUserComponent } from './pages-user.component';

describe('PagesUserComponent', () => {
  let component: PagesUserComponent;
  let fixture: ComponentFixture<PagesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
