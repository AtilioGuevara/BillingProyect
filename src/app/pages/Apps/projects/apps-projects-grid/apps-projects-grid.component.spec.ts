import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsProjectsGridComponent } from './apps-projects-grid.component';

describe('AppsProjectsGridComponent', () => {
  let component: AppsProjectsGridComponent;
  let fixture: ComponentFixture<AppsProjectsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsProjectsGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsProjectsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
