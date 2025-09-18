import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsProjectsRoadmapComponent } from './apps-projects-roadmap.component';

describe('AppsProjectsRoadmapComponent', () => {
  let component: AppsProjectsRoadmapComponent;
  let fixture: ComponentFixture<AppsProjectsRoadmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsProjectsRoadmapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsProjectsRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
