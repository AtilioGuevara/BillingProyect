import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesUserProjectsComponent } from './pages-user-projects.component';

describe('PagesUserProjectsComponent', () => {
  let component: PagesUserProjectsComponent;
  let fixture: ComponentFixture<PagesUserProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesUserProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesUserProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
