import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsProjectsFilesComponent } from './apps-projects-files.component';

describe('AppsProjectsFilesComponent', () => {
  let component: AppsProjectsFilesComponent;
  let fixture: ComponentFixture<AppsProjectsFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsProjectsFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsProjectsFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
