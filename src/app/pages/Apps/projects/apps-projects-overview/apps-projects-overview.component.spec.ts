import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsProjectsOverviewComponent } from './apps-projects-overview.component';

describe('AppsProjectsOverviewComponent', () => {
  let component: AppsProjectsOverviewComponent;
  let fixture: ComponentFixture<AppsProjectsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsProjectsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsProjectsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
